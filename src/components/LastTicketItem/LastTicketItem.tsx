import { RouteProps } from "../../types/types";
import OptionsIcon from "../../assets/icons/options.svg?react";
import RubIcon from "../../assets/icons/rub.svg?react";
import classes from "./lastTicketItem.module.css";

export const LastTicketItem = ({ route }: { route: RouteProps }) => {
  return (
    <div className={classes["ticket"]}>
      <div className={classes["ticket__direction"]}>
        <div className={classes["ticket__direction-from"]}>
          <span className={classes["ticket__city"]}>
            {route.departure.from.city.name}
          </span>
          <span className={classes["ticket__station"]}>
            {" "}
            {route.departure.from.railway_station_name}
          </span>
        </div>
        <div className={classes["ticket__direction-to"]}>
          <span className={classes["ticket__city"]}>
            {route.departure.to.city.name}
          </span>
          <span className={classes["ticket__station"]}>
            {" "}
            {route.departure.to.railway_station_name}
          </span>
        </div>
      </div>
      <div className={classes["ticket__options"]}>
        <div className={classes["ticket-icon"]}>
          <OptionsIcon />
        </div>
        <div className={classes["ticket-price-container"]}>
          <span className={classes["ticket-text"]}>от</span>
          <span className={classes["ticket-price"]}>{route.min_price}</span>
          <RubIcon />
        </div>
      </div>
    </div>
  );
};
