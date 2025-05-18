import { useState } from "react";
import cn from "classnames";
import ArrowIcon from "../../assets/icons/seats/yellow-arrow.svg?react";
import TrainIcon from "../../assets/icons/seats/train.svg?react";
import TicketArrowIcon from "../../assets/icons/seats/ticket-arrow.svg?react";
import ClocksIcon from "../../assets/icons/seats/clocks.svg?react";
import BlackArrowIcon from "../../assets/icons/seats/arrow3.svg?react";
import FirstClassIcon from "../../assets/icons/seats/1class.svg?react";
import SecondClassIcon from "../../assets/icons/seats/2class.svg?react";
import ThirdClassIcon from "../../assets/icons/seats/3class.svg?react";
import FourthClassIcon from "../../assets/icons/seats/4class.svg?react";
import RubIcon from "../../assets/icons/rub.svg?react";
import WifiIcon from "../../assets/icons/seats/wi-fi.svg?react";
import LinenIcon from "../../assets/icons/seats/linen.svg?react";
import NutritionIcon from "../../assets/icons/seats/nutrition.svg?react";
import ConditionerIcon from "../../assets/icons/seats/conditioner.svg?react";
import TooltipConIcon from "../../assets/icons/seats/clue-cond.svg?react";
import TooltipWiFiIcon from "../../assets/icons/seats/clue-wifi.svg?react";
import TooltipLinenIcon from "../../assets/icons/seats/clue-linen.svg?react";
import TooltipNutIcon from "../../assets/icons/seats/clue-nut.svg?react";
import { TicketState } from "../../redux/slicers/selectedTicketSlice";
import { useTime } from "../../hooks/useTime";
import { useSeconds } from "../../hooks/useSeconds";
import { useDispatch } from "react-redux";
import { clearSelectedTicket } from "../../redux/slicers/selectedTicketSlice";
import { CoachWithSeats } from "../../redux/slicers/seatsSlice";
import classes from "./seatDirectionCard.module.css";

type SeatDirectionCardProps = {
  direction: "forward" | "backward";
  directionTicket: TicketState;
  seatsData: CoachWithSeats[];
  passengers: {
    adults: number;
    kids: number;
    kidsNoSeat: number;
  };
  setPassengers: (p: { adults: number; kids: number; kidsNoSeat: number }) => void;
};

export const SeatDirectionCard = ({
  direction,
  directionTicket,
  seatsData,
  passengers,
  setPassengers,
}: SeatDirectionCardProps) => {
  const [isNutritionActive, setIsNutritionActive] = useState(false);

  const coach = seatsData[0]?.coach;
  const duration = useSeconds(directionTicket.departure.duration ?? 0);
  const classType = coach?.class_type;

  const dispatch = useDispatch();

  const backward = direction === "backward";

  const handleBack = () => {
    dispatch(clearSelectedTicket());
  };

  const useFormattedTime = (
    datetime: number | undefined,
    type: "datetime" | "duration"
  ) => {
    const time = useTime(datetime ?? 0, { type });
    return datetime ? time : { formatted: "", localized: "" };
  };

  const datetimeFrom = useFormattedTime(
    directionTicket.departure.from.datetime,
    "datetime"
  );
  const datetimeTo = useFormattedTime(
    directionTicket.departure.to.datetime,
    "datetime"
  );

  const priceInfo = directionTicket.departure.price_info;
  const topPrice =
    classType && classType in priceInfo
      ? priceInfo[classType as keyof typeof priceInfo]?.top_price
      : undefined;
  const bottomPrice =
    classType && classType in priceInfo
      ? priceInfo[classType as keyof typeof priceInfo]?.bottom_price
      : undefined;

  return (
    <div className={classes["seats"]}>
      <div className={backward ? classes["seats__controls-back"] : classes["seats__controls"]}>

        <ArrowIcon className={backward ? classes["seats__controls-icon-back"] : classes["seats__controls-icon"]} />
        <button
          onClick={handleBack}
          className={cn(classes["seats__controls-button"], ["yel-button"])}
        >
          Выбрать другой поезд
        </button>
      </div>

      <div className={classes["seats__ticket-info"]}>
        <TrainIcon />
        <div className={classes["seats__ticket-info-direction"]}>
          <span className={classes["seats__ticket-info-direction-name"]}>
            {coach?.name}
          </span>
          <span>
            {directionTicket.departure.from.city.name} <BlackArrowIcon />
          </span>
          <span>{directionTicket.departure.to.city.name}</span>
        </div>

        <div className={classes["seats__ticket-info-from"]}>
          <span className={classes["seats__ticket-info-time"]}>
            {datetimeFrom.localized}
          </span>
          <span className={classes["seats__ticket-info-city"]}>
            {directionTicket.departure.from.city.name}
          </span>
          <span className={classes["seats__ticket-info-station"]}>
            {directionTicket.departure.from.railway_station_name}
          </span>
        </div>

        <TicketArrowIcon />

        <div className={classes["seats__ticket-info-to"]}>
          <span className={classes["seats__ticket-info-time"]}>
            {datetimeTo.localized}
          </span>
          <span className={classes["seats__ticket-info-city"]}>
            {directionTicket.departure.to.city.name}
          </span>
          <span className={classes["seats__ticket-info-station"]}>
            {directionTicket.departure.to.railway_station_name}
          </span>
        </div>

        <div className={classes["seats__ticket-info-duration"]}>
          <ClocksIcon />
          <span>{duration}</span>
        </div>
      </div>

      <div className={classes["seats__count"]}>
        <h4 className={classes["seats-title"]}>Количество билетов</h4>
        <div className={classes["seats__count-buttons"]}>
          <div className={classes["seats__count-button-container"]}>
            <button
              className={cn(classes["seats__count-button"], ["yel-button"])}
              onClick={() => {
                if (passengers.adults < 5) {
                  setPassengers({
                    ...passengers,
                    adults: passengers.adults + 1,
                  });
                }
              }}
            >
              Взрослых — {passengers.adults}
            </button>
            <span className={classes["seats__count-text"]}>
              Можно добавить еще {5 - passengers.adults} пассажиров
            </span>
          </div>

          <div className={classes["seats__count-button-container"]}>
            <button
              className={cn(classes["seats__count-button"], ["yel-button"])}
              onClick={() => {
                if (passengers.kids < 5) {
                  setPassengers({
                    ...passengers,
                    kids: passengers.kids + 1,
                  });
                }
              }}
            >
              Детских — {passengers.kids}
            </button>
            <span className={classes["seats__count-text-kids"]}>
              Можно добавить еще {5 - passengers.kids} детей до 10 лет
            </span>
          </div>

          <div className={classes["seats__count-button-container"]}>
            <button
              onClick={() => {
                setPassengers({
                  ...passengers,
                  kidsNoSeat: passengers.kidsNoSeat + 1,
                });
              }}
              className={cn(classes["seats__count-button"], ["yel-button"])}
            >
              Детских «без места» — {passengers.kidsNoSeat}
            </button>
          </div>
        </div>
      </div>

      <div className={classes["seats__types"]}>
        <h4 className={classes["seats-title"]}>Тип вагона</h4>
        <div className={classes["seats__types-list"]}>
          <div
            className={cn(classes["seats__types-item"], {
              [classes["aviable"]]: classType === "fourth",
            })}
          >
            <FourthClassIcon /> <span>Сидячий</span>
          </div>
          <div
            className={cn(classes["seats__types-item"], {
              [classes["aviable"]]: classType === "third",
            })}
          >
            <ThirdClassIcon /> <span>Плацкарт</span>
          </div>
          <div
            className={cn(classes["seats__types-item"], {
              [classes["aviable"]]: classType === "second",
            })}
          >
            <SecondClassIcon /> <span>Купе</span>
          </div>
          <div
            className={cn(classes["seats__types-item"], {
              [classes["aviable"]]: classType === "first",
            })}
          >
            <FirstClassIcon /> <span>Люкс</span>
          </div>
        </div>

        <div className={classes["seats__types-info"]}>
          <div className={classes["seats__types-info-wagon"]}>
            <span>Вагоны</span>
            <span className={classes["number-white"]}>07</span>
            <span className={classes["number-black"]}>09</span>
          </div>

          <div className={classes["seats__types-info-wagon-options"]}>
            <div>
              <span className={classes["options-number"]}>07</span> вагон
            </div>
            <div>
              <span>Места </span>
              <span>{coach?.available_seats}</span>
            </div>
            <div>
              <span>Стоимость: </span>
              <span className={classes["price"]}>{topPrice}</span> <RubIcon />
              <span className={classes["price"]}>{bottomPrice}</span> <RubIcon />
            </div>
            <div className={classes["seats__types-info-wagon-options-service"]}>
              <span>Обслуживание ФПК</span>
              <div
                className={
                  classes["seats__types-info-wagon-options-service-options"]
                }
              >
                <div className={classes["service-option-wrapper"]}>
                  <button
                    className={cn(classes["service-option"], {
                      [classes["included-option"]]:
                        coach?.have_air_conditioning,
                    })}
                  >
                    <ConditionerIcon />
                  </button>
                  <div className={classes["tooltip"]}>
                    <TooltipConIcon />
                  </div>
                </div>
                <div className={classes["service-option-wrapper"]}>
                  <button
                    className={cn(classes["service-option"], {
                      [classes["included-option"]]: coach?.have_wifi,
                    })}
                  >
                    <WifiIcon />
                  </button>
                  <div className={classes["tooltip"]}>
                    <TooltipWiFiIcon />
                  </div>
                </div>
                <div className={classes["service-option-wrapper"]}>
                  <button
                    className={cn(classes["service-option"], {
                      [classes["included-option"]]: coach?.is_linens_included,
                    })}
                  >
                    <LinenIcon />
                  </button>
                  <div className={classes["tooltip"]}>
                    <TooltipLinenIcon />
                  </div>
                </div>
                <div className={classes["service-option-wrapper"]}>
                  <button
                    onClick={() => setIsNutritionActive((prev) => !prev)}
                    className={cn(classes["service-option"], {
                      [classes["active-option"]]: isNutritionActive,
                    })}
                  >
                    <NutritionIcon />
                  </button>
                  <div className={classes["tooltip"]}>
                    <TooltipNutIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};
