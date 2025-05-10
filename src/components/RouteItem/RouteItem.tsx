import { SeatsList } from "../SeatsList/SeatsList";
import TrainIcon from "../../assets/icons/train.svg?react";
import OptionsIcon from "../../assets/icons/options.svg?react";
import ArrowIcon from "../../assets/icons/arrow2.svg?react";
import ArrowYelIcon from "../../assets/icons/arrow3.svg?react";
import { useTime } from "../../hooks/useTime";
import { RouteProps } from "../../types/types";
import { setSeats } from "../../redux/slicers/seatsSlice";
import classes from "./routeItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { setSelectedTicket } from "../../redux/slicers/selectedTicketSlice";

import cn from "classnames";

const useFormattedTime = (
  datetime: number | undefined,
  type: "datetime" | "duration"
) => {
  const time = useTime(datetime ?? 0, { type });
  return datetime ? time : { formatted: "", localized: "" };
};

const url = import.meta.env.VITE_HOST;
export const RouteItem = ({ route }: { route: RouteProps }) => {
  const seats = route.departure.available_seats_info;
  const price = route.departure.price_info;
  const train = route.departure.train;

  const datetimeFrom = useFormattedTime(
    route.departure.from.datetime,
    "datetime"
  );
  const datetimeTo = useFormattedTime(route.departure.to.datetime, "datetime");
  const duration = useFormattedTime(route.departure.duration, "duration");

  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.routes);

  const handleSelectSeats = async () => {
    const params = new URLSearchParams();

    if (filters.have_first_class) params.append("have_first_class", "true");
    if (filters.have_second_class) params.append("have_second_class", "true");
    if (filters.have_third_class) params.append("have_third_class", "true");
    if (filters.have_fourth_class) params.append("have_fourth_class", "true");
    if (filters.have_wifi) params.append("have_wifi", "true");
    if (filters.is_express) params.append("have_express", "true");

    const queryString = params.toString();
    const apiUrl = `${url}/routes/${route.departure._id}/seats?${queryString}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      dispatch(setSeats(data));
      dispatch(setSelectedTicket(route));

      console.log("Список мест:", data);
      console.log("Билет",route);
    } catch (err) {
      console.error("Ошибка при загрузке мест:", err);
    }
  };

  return (
    <div className={classes["route-item"]}>
      <div className={classes["route-item__train"]}>
        <TrainIcon className={classes["route-item__train-icon"]} />
        <span className={classes["route-item__train-name"]}>{train.name}</span>
        <span className={classes["route-item__city"]}>
          {route.departure.from.city.name} <ArrowIcon /> <br />
          {route.departure.to.city.name} <br />
        </span>
      </div>

      <div className={classes["route-item__info"]}>
        <div className={classes["route-item__info-from"]}>
          <span className={classes["route-item__info-time"]}>
            {datetimeFrom.localized}
          </span>
          <span className={classes["route-item__info-city"]}>
            {route.departure.from.city.name}
          </span>
          <span className={classes["route-item__info-station"]}>
            {route.departure.from.railway_station_name}
          </span>
        </div>

        <div className={classes["route-item__info-options"]}>
          <span className={classes["route-item__info-duration"]}>
            {duration.formatted}
          </span>
          <ArrowYelIcon className={classes["route-item__info-icon"]} />
        </div>

        <div className={classes["route-item__info-to"]}>
          <span className={classes["route-item__info-time"]}>
            {datetimeTo.localized}
          </span>
          <span className={classes["route-item__info-city"]}>
            {route.departure.to.city.name}
          </span>
          <span className={classes["route-item__info-station"]}>
            {route.departure.to.railway_station_name}
          </span>
        </div>
      </div>

      <div className={classes["route__third"]}>
        <SeatsList seats={seats} price={price} />
        <div className={classes["route__third-options"]}>
          <OptionsIcon className={classes["route__third-icon"]} />
          <button
            className={cn(classes["route__button"], ["shadow-button"])}
            onClick={handleSelectSeats}
          >
            Выбрать места
          </button>
        </div>
      </div>
    </div>
  );
};
