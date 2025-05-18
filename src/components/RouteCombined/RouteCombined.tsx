import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTime } from "../../hooks/useTime";
import { SeatsList } from "../SeatsList/SeatsList";
import TrainIcon from "../../assets/icons/train.svg?react";
import ArrowIcon from "../../assets/icons/arrow2.svg?react";
import ArrowYelIcon from "../../assets/icons/arrow3.svg?react";
import OptionsIcon from "../../assets/icons/options.svg?react";
import {
  setForwardTicket,
  setBackwardTicket,
} from "../../redux/slicers/selectedTicketSlice";
import {
  setDepartureSeats,
  setArrivalSeats,
} from "../../redux/slicers/seatsSlice";
import { RootState } from "../../redux/state/store";
import { PopUp } from "../PopUp/PopUp";
import { RouteProps } from "../../types/types";
import cn from "classnames";
import classes from "./routeCombined.module.css";

type RouteCombinedProps = {
  forwardRoute: RouteProps;
  backwardRoute: RouteProps;
  buttonText?: string;
  onButtonClick?: () => void;
};

const useFormattedTime = (
  datetime: number | undefined,
  type: "datetime" | "duration"
) => {
  const time = useTime(datetime ?? 0, { type });
  return datetime ? time : { formatted: "", localized: "" };
};

const url = import.meta.env.VITE_HOST;

export const RouteCombined = ({
  forwardRoute,
  backwardRoute,
  buttonText = "Выбрать места",
  onButtonClick,
}: RouteCombinedProps) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.routes);
  const [error, setError] = useState(false);

  const handleSelectSeats = async () => {
    const params = new URLSearchParams();
    if (filters.have_first_class) params.append("have_first_class", "true");
    if (filters.have_second_class) params.append("have_second_class", "true");
    if (filters.have_third_class) params.append("have_third_class", "true");
    if (filters.have_fourth_class) params.append("have_fourth_class", "true");
    if (filters.have_wifi) params.append("have_wifi", "true");
    if (filters.is_express) params.append("have_express", "true");

    const queryString = params.toString();

    try {
      const [forwardRes, backwardRes] = await Promise.all([
        fetch(
          `${url}/routes/${forwardRoute.departure._id}/seats?${queryString}`
        ),
        fetch(
          `${url}/routes/${backwardRoute.departure._id}/seats?${queryString}`
        ),
      ]);
      const [forwardData, backwardData] = await Promise.all([
        forwardRes.json(),
        backwardRes.json(),
      ]);

      dispatch(setDepartureSeats(forwardData));
      dispatch(setArrivalSeats(backwardData));

      const forwardTicket = {
        available_seats:
          forwardRoute.available_seats_info.first +
          forwardRoute.available_seats_info.second +
          forwardRoute.available_seats_info.third +
          forwardRoute.available_seats_info.fourth,
        available_seats_info: forwardRoute.available_seats_info,
        departure: forwardRoute.departure,
        have_air_conditioning: forwardRoute.departure.have_air_conditioning,
        have_first_class: forwardRoute.departure.have_first_class,
        have_second_class: forwardRoute.departure.have_second_class,
        have_third_class: forwardRoute.departure.have_third_class,
        have_fourth_class: forwardRoute.departure.have_fourth_class,
        have_wifi: forwardRoute.departure.have_wifi,
        is_express: forwardRoute.departure.is_express,
        min_price: forwardRoute.departure.min_price,
        adults: 0,
        kids: 0,
        kidsNoSeat: 0,
        totalPrice: 0,
      };

      const backwardTicket = {
        available_seats:
          backwardRoute.available_seats_info.first +
          backwardRoute.available_seats_info.second +
          backwardRoute.available_seats_info.third +
          backwardRoute.available_seats_info.fourth,
        available_seats_info: backwardRoute.available_seats_info,
        departure: backwardRoute.departure,
        have_air_conditioning: backwardRoute.departure.have_air_conditioning,
        have_first_class: backwardRoute.departure.have_first_class,
        have_second_class: backwardRoute.departure.have_second_class,
        have_third_class: backwardRoute.departure.have_third_class,
        have_fourth_class: backwardRoute.departure.have_fourth_class,
        have_wifi: backwardRoute.departure.have_wifi,
        is_express: backwardRoute.departure.is_express,
        min_price: backwardRoute.departure.min_price,
        adults: 0,
        kids: 0,
        kidsNoSeat: 0,
        totalPrice: 0,
      };

      dispatch(setForwardTicket(forwardTicket));
      dispatch(setBackwardTicket(backwardTicket));
    } catch (err) {
      console.error("Ошибка при загрузке мест:", err);
      setError(true);
    }
  };

  const handleClick = onButtonClick || handleSelectSeats;

  const forwardFrom = useFormattedTime(
    forwardRoute.departure.from.datetime,
    "datetime"
  );
  const forwardTo = useFormattedTime(
    forwardRoute.departure.to.datetime,
    "datetime"
  );
  const forwardDuration = useFormattedTime(
    forwardRoute.departure.duration,
    "duration"
  );

  const backwardFrom = useFormattedTime(
    backwardRoute.departure.from.datetime,
    "datetime"
  );
  const backwardTo = useFormattedTime(
    backwardRoute.departure.to.datetime,
    "datetime"
  );
  const backwardDuration = useFormattedTime(
    backwardRoute.departure.duration,
    "duration"
  );

  return (
    <div className={classes["combined"]}>
      {error && (
        <PopUp
          type="error"
          textFirst="Произошла ошибка загрузки данных"
          textSecond="Повторите попытку позже"
          onClose={() => setError(false)}
          isOpen={error}
        />
      )}

      <div className={classes["combined__train"]}>
        <TrainIcon />
        <span className={classes["combined__train-name"]}>
          {forwardRoute.departure.train.name}
        </span>
        <span className={classes["combined__route"]}>
          {forwardRoute.departure.from.city.name} <ArrowIcon />{" "}
          {forwardRoute.departure.to.city.name}
        </span>
      </div>

      <div className={classes["combined__info"]}>
        <div className={classes["combined__info-block"]}>
          <div className={classes["combined__info-from"]}>
            <span className={classes["combined__info-time"]}>{forwardFrom.localized}</span>
            <div className={classes["combined__info-city"]}>{forwardRoute.departure.from.city.name}</div>
            <div className={classes["combined__info-station"]}>{forwardRoute.departure.from.railway_station_name}</div>
          </div>
          <div className={classes["combined__info-options"]}>
            <span className={classes["combined__info-duration"]}>{forwardDuration.formatted}</span>
            <ArrowYelIcon />
          </div>
          <div className={classes["combined__info-to"]}>
            <span className={classes["combined__info-time"]}>{forwardTo.localized}</span>
            <div className={classes["combined__info-city"]}>{forwardRoute.departure.to.city.name}</div>
            <div className={classes["combined__info-station"]}>{forwardRoute.departure.to.railway_station_name}</div>
          </div>
        </div>

        <div className={classes["combined__info-block"]}>
          <div className={classes["combined__info-to"]}>
            <span className={classes["combined__info-time"]}>{backwardTo.localized}</span>
            <div className={classes["combined__info-city"]}>{backwardRoute.departure.to.city.name}</div>
            <div className={classes["combined__info-station"]}>{backwardRoute.departure.to.railway_station_name}</div>
          </div>
          
          <div className={classes["combined__info-options"]}>
            <span className={classes["combined__info-duration"]}>{backwardDuration.formatted}</span>
            <ArrowYelIcon className={classes["arrow-back"]}/>
          </div>
          <div className={classes["combined__info-from"]}>
            <span className={classes["combined__info-time"]}>{backwardFrom.localized}</span>
            <div className={classes["combined__info-city"]}>{backwardRoute.departure.from.city.name}</div>
            <div className={classes["combined__info-station"]}>{backwardRoute.departure.from.railway_station_name}</div>
          </div>
        </div>
      </div>

      <div className={classes["combined__seats"]}>
        <SeatsList
          seats={forwardRoute.available_seats_info}
          price={forwardRoute.departure.price_info}
        />
        <SeatsList
          seats={backwardRoute.available_seats_info}
          price={backwardRoute.departure.price_info}
        />
        <div className={classes["combined__options"]}>
          <OptionsIcon />
          <button
            onClick={handleClick}
            className={cn(classes["combined__button"], "shadow-button", {
              [classes["change-button"]]: buttonText === "Изменить",
            })}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
