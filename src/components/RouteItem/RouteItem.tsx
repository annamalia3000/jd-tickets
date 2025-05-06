import { SeatsList } from "../SeatsList/SeatsList";
import TrainIcon from "../../assets/icons/train.svg?react";
import OptionsIcon from "../../assets/icons/options.svg?react";
import ArrowIcon from "../../assets/icons/arrow2.svg?react";
import ArrowYelIcon from "../../assets/icons/arrow3.svg?react";
import { useTime } from "../../hooks/useTime";
import { RouteProps } from "../../types/types";
import cn from "classnames";
import classes from "./routeItem.module.css";

const useFormattedTime = (
  datetime: number | undefined,
  type: "datetime" | "duration"
) => {
  const time = useTime(datetime ?? 0, { type });
  return datetime ? time : { formatted: "", localized: "" };
};
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
          <button className={cn(classes["route__button"], ["shadow-button"])}>
            Выбрать места
          </button>
        </div>
      </div>
    </div>
  );
};