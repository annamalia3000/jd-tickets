import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import Select from "react-select"; //
import { RouteItem } from "../RouteItem/RouteItem";
import { useState, useMemo } from "react";
import cn from "classnames";
import "./sortSelect.css";
import classes from "./routeList.module.css";

type SortOption = "price" | "time" | "duration";

export const RouteList = () => {
  const { totalCount, items } = useSelector((state: RootState) => state.routes);
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const sortOptions = [
    { value: "time", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ];

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
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
  }, [items, sortBy]);

  if (!items.length) {
    return null;
  }
  return (
    <div className={classes["route"]}>
      <div className={classes["route__utility"]}>
        <div className={classes["route__utility-total"]}>
          найдено {totalCount}
        </div>
        <div className={classes["route__utility-vision"]}>
        <div className={classes["route__utility-sort"]}>
          сортировать по:
          <Select
            className={classes["route__select"]}
            classNamePrefix="sort-select"
            options={sortOptions}
            value={sortOptions.find((opt) => opt.value === sortBy)}
            onChange={(selected) => setSortBy(selected?.value as SortOption)}
            isSearchable={false}
          />
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
        {sortedItems.slice(0, itemsPerPage).map((item) => (
          <RouteItem route={item} key={item.departure._id} />
        ))}
      </div>
    </div>
  );
};
