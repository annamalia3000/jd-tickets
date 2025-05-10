import { useSelector } from "react-redux";
import { RootState } from "../redux/state/store";
import { RouteProps } from "../types/types";

export const useFilters = () => {
  const filters = useSelector((state: RootState) => state.routes.filters);

  const filterByToggles = (item: RouteProps): boolean => {
    const toggleKeys: Array<keyof typeof filters> = [
      "have_first_class",
      "have_second_class",
      "have_third_class",
      "have_fourth_class",
      "have_wifi",
      "is_express",
    ];

    return toggleKeys.every((key) => {
      return !filters[key] || item.departure[key];
    });
  };

  const filterByPrice = (item: RouteProps): boolean => {
    const minPrice = filters.minPrice;
    const maxPrice = filters.maxPrice;

    const itemMinPrice = item.min_price;

    const topPrices = Object.values(item.departure.price_info || {}).map(
      (section) => section.top_price
    );
    const itemMaxPrice = Math.max(...topPrices);

    return itemMaxPrice >= minPrice && itemMinPrice <= maxPrice;
  };

  const filterByDateTime = (
    item: RouteProps,
    direction: "from" | "to"
  ): boolean => {
    const departureTime = item.departure.from.datetime;
    const arrivalTime = item.departure.to.datetime;

    const departureTimeInMinutes = Math.floor(departureTime / 60) % 1440;
    const arrivalTimeInMinutes = Math.floor(arrivalTime / 60) % 1440;

    const directionFilters = filters[direction];

    const matchesDepartureTime =
      departureTimeInMinutes >= (directionFilters.minTimeDepature ?? 0) &&
      departureTimeInMinutes <= (directionFilters.maxTimeDepature ?? 1440);

    const matchesArrivalTime =
      arrivalTimeInMinutes >= (directionFilters.minTimeArrival ?? 0) &&
      arrivalTimeInMinutes <= (directionFilters.maxTimeArrival ?? 1440);

    return matchesDepartureTime && matchesArrivalTime;
  };

  return {
    filterByToggles,
    filterByPrice,
    filterByDateTime,
  };
};
