import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { RootState } from "../../redux/state/store";
import { SelectComponent } from "../Select/SelectComponent";
import { RouteItem } from "../RouteItem/RouteItem";
import { PagesNum } from "../PagesNum/PagesNum";
import cn from "classnames";
import classes from "./routeList.module.css";

type SortOption = "price" | "time" | "duration";

export const RouteList = () => {
  const { forwardRoutes, backwardRoutes, filters } = useSelector(
    (state: RootState) => state.routes
  );

  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const sortOptions = [
    { value: "time", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ];

  const { filterByToggles, filterByPrice, filterByDateTime } = useFilters();

  const filteredItems = useMemo(() => {
    const filteredForwardRoutes = forwardRoutes.filter((item) => {
      const matchesToggles = filterByToggles(item);
      const matchesPrice = filterByPrice(item);
      const matchesDepartureTime = filterByDateTime(item, "from");
      const matchesArrivalTime = filterByDateTime(item, "from");

      return (
        matchesToggles &&
        matchesPrice &&
        matchesDepartureTime &&
        matchesArrivalTime
      );
    });

    const filteredBackwardRoutes = backwardRoutes.filter((item) => {
      const matchesToggles = filterByToggles(item);
      const matchesPrice = filterByPrice(item);
      const matchesDepartureTime = filterByDateTime(item, "to");
      const matchesArrivalTime = filterByDateTime(item, "to");

      return (
        matchesToggles &&
        matchesPrice &&
        matchesDepartureTime &&
        matchesArrivalTime
      );
    });

    return [...filteredForwardRoutes, ...filteredBackwardRoutes];
  }, [
    forwardRoutes,
    backwardRoutes,
    filters,
    filterByToggles,
    filterByPrice,
    filterByDateTime,
  ]);

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

  if (!filteredItems.length) return null;

  return (
    <div className={classes["route"]}>
      <div className={classes["route__utility"]}>
        <div className={classes["route__utility-total"]}>
          найдено {filteredItems.length}
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
        {currentItems.map((item) => (
          <RouteItem route={item} key={item.departure._id} />
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
