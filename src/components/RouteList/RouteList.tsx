import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { RootState } from "../../redux/state/store";
import { SelectComponent } from "../Select/SelectComponent";
import { RouteItem } from "../RouteItem/RouteItem";
import { RouteCombined } from "../RouteCombined/RouteCombined";
import { PagesNum } from "../PagesNum/PagesNum";
import { setDepartureSeats, setArrivalSeats} from "../../redux/slicers/seatsSlice";
import {
  setForwardTicket,
  setBackwardTicket,
} from "../../redux/slicers/selectedTicketSlice";
import { RouteProps } from "../../types/types";
import cn from "classnames";
import classes from "./routeList.module.css";

type SortOption = "price" | "time" | "duration";

export const RouteList = () => {
  const { forwardRoutes, backwardRoutes, filters } = useSelector(
    (state: RootState) => state.routes
  );

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const sortOptions = [
    { value: "time", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ];

  const { filterByToggles, filterByPrice, filterByDateTime } = useFilters();
  const url = import.meta.env.VITE_HOST;

  const firstForwardRoute = forwardRoutes[0];
  const firstBackwardRoute = backwardRoutes[0];

  const filteredItems = useMemo(() => {
    const filteredForwardRoutes = forwardRoutes
      .slice(1)
      .filter((item) =>
        [
          filterByToggles,
          filterByPrice,
          (i: RouteProps) => filterByDateTime(i, "from"),
          (i: RouteProps) => filterByDateTime(i, "from"),
        ].every((fn) => fn(item))
      );

    const filteredBackwardRoutes = backwardRoutes
      .slice(1)
      .filter((item) =>
        [
          filterByToggles,
          filterByPrice,
          (i: RouteProps) => filterByDateTime(i, "to"),
          (i: RouteProps) => filterByDateTime(i, "to"),
        ].every((fn) => fn(item))
      );

    return [...filteredForwardRoutes, ...filteredBackwardRoutes];
  }, [forwardRoutes, backwardRoutes, filters]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.min_price - b.min_price;
        case "duration":
          return a.departure.duration - b.departure.duration;
        case "time":
        default:
          return a.departure.from.datetime - b.departure.from.datetime;
      }
    });
  }, [filteredItems, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectSeats = async (
    forwardRoute: RouteProps | null,
    backwardRoute: RouteProps | null
  ) => {
    const params = new URLSearchParams();

    if (filters.have_first_class) params.append("have_first_class", "true");
    if (filters.have_second_class) params.append("have_second_class", "true");
    if (filters.have_third_class) params.append("have_third_class", "true");
    if (filters.have_fourth_class) params.append("have_fourth_class", "true");
    if (filters.have_wifi) params.append("have_wifi", "true");
    if (filters.is_express) params.append("have_express", "true");

    const queryString = params.toString();

    try {
      const requests = [];

      if (forwardRoute) {
        requests.push(
          fetch(
            `${url}/routes/${forwardRoute.departure._id}/seats?${queryString}`
          )
        );
      }

      if (backwardRoute) {
        requests.push(
          fetch(
            `${url}/routes/${backwardRoute.departure._id}/seats?${queryString}`
          )
        );
      }

      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));

      if (forwardRoute) {
        dispatch(setDepartureSeats(data[0]));
      }

      if (backwardRoute) {
        dispatch(setArrivalSeats(data[1]));
      }

      if (forwardRoute) {
        dispatch(setForwardTicket(forwardRoute));
      }

      if (backwardRoute) {
        dispatch(setBackwardTicket(backwardRoute));
      }
    } catch (err) {
      console.error("Ошибка при загрузке мест:", err);
    }
  };

  const hasCombinedRoute = firstForwardRoute && firstBackwardRoute;

  if (!filteredItems.length && !hasCombinedRoute) return null;

  return (
    <div className={classes["route"]}>
      <div className={classes["route__utility"]}>
        <div className={classes["route__utility-total"]}>
          найдено {filteredItems.length + (hasCombinedRoute ? 1 : 0)}
        </div>
        <div className={classes["route__utility-vision"]}>
          <div className={classes["route__utility-sort"]}>
            сортировать по:
            <div className={classes["route__select"]}>
              <SelectComponent
                value={sortBy}
                onChange={(val) => setSortBy(val as SortOption)}
                options={sortOptions}
              />
            </div>
          </div>
          <div className={classes["route__utility-show"]}>
            показывать по:
            {[5, 10, 20].map((num) => (
              <button
                key={num}
                onClick={() => setItemsPerPage(num)}
                className={cn(classes["route__utility-show-button"], {
                  [classes["active"]]: itemsPerPage === num,
                })}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={classes["route__list"]}>
        {hasCombinedRoute && (
          <RouteCombined
            forwardRoute={firstForwardRoute}
            backwardRoute={firstBackwardRoute}
            buttonText="Выбрать места"
            onButtonClick={() =>
              handleSelectSeats(firstForwardRoute, firstBackwardRoute)
            }
          />
        )}

        {currentItems.map((item) => (
          <RouteItem
            route={item}
            key={item.departure._id}
            buttonText="Выбрать места"
            onButtonClick={() => handleSelectSeats(item, null)}
          />
        ))}
      </div>

      <div className={classes["route__pages"]}>
        <PagesNum
          count={sortedItems.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
