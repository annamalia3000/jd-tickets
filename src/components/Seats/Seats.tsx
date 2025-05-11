import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
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
import { useTime } from "../../hooks/useTime";
import { useSeconds } from "../../hooks/useSeconds";
import {
  clearSelectedTicket,
  setAdultsNumberTicket,
  setKidsNumberTicket,
  setKidsNoSeatNumberTicket,
} from "../../redux/slicers/selectedTicketSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";
import classes from "./seats.module.css";

export const Seats = () => {
  const seats = useSelector((state: RootState) => state.seats);
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );

  const navigate = useNavigate();
  const [isNutritionActive, setIsNutritionActive] = useState(false);
  const [adultsNumber, setAdultsNumber] = useState(1);
  const [adultsNumberRest, setAdultsNumberRest] = useState(4);

  const [kidsNumber, setKidsNumber] = useState(0);
  const [kidsNumberRest, setKidsNumberRest] = useState(4);
  const [kidsNumberNoPlace, setKidsNumberNoPlace] = useState(0);

  const currentClassType = seats[0]?.coach.class_type;

  const priceInfo = selectedTicket?.departure.price_info;
  const topPrice =
    currentClassType && priceInfo
      ? priceInfo[currentClassType as keyof typeof priceInfo]?.top_price
      : undefined;
  const bottomPrice =
    currentClassType && priceInfo
      ? priceInfo[currentClassType as keyof typeof priceInfo]?.bottom_price
      : undefined;

  const duration = useSeconds(selectedTicket?.departure?.duration ?? 0);

  const useFormattedTime = (
    datetime: number | undefined,
    type: "datetime" | "duration"
  ) => {
    const time = useTime(datetime ?? 0, { type });
    return datetime ? time : { formatted: "", localized: "" };
  };

  const datetimeFrom = useFormattedTime(
    selectedTicket?.departure.from.datetime,
    "datetime"
  );
  const datetimeTo = useFormattedTime(
    selectedTicket?.departure.to.datetime,
    "datetime"
  );

  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(clearSelectedTicket());
  };

  const handleButtonClick = () => {
    dispatch(setAdultsNumberTicket(adultsNumber));
    dispatch(setKidsNumberTicket(kidsNumber));
    dispatch(setKidsNoSeatNumberTicket(kidsNumberNoPlace));
    navigate("/passengers");
  };

  if (!selectedTicket) {
    return null; // или заглушка / лоадер
  }

  return (
    <div className={classes["seats-container"]}>
      <div className={classes["seats"]}>
        <div className={classes["seats__controls"]}>
          <ArrowIcon className={classes["seats__controls-icon"]} />
          <button
            onClick={handleBack}
            className={cn(classes["seats__controls-button"], ["yel-button"])}
          >
            Выбрать другой поезд
          </button>{" "}
        </div>

        <div className={classes["seats__ticket-info"]}>
          <TrainIcon />

          <div className={classes["seats__ticket-info-direction"]}>
            <span className={classes["seats__ticket-info-direction-name"]}>
              {seats[0]?.coach.name}
            </span>
            <span>
              {selectedTicket.departure.from.city.name} <BlackArrowIcon />
            </span>
            <span>{selectedTicket.departure.to.city.name}</span>
          </div>
          <div className={classes["seats__ticket-info-from"]}>
            <span className={classes["seats__ticket-info-time"]}>
              {datetimeFrom.localized}
            </span>
            <span className={classes["seats__ticket-info-city"]}>
              {selectedTicket.departure.from.city.name}
            </span>
            <span className={classes["seats__ticket-info-station"]}>
              {selectedTicket.departure.from.railway_station_name}
            </span>
          </div>

          <TicketArrowIcon />

          <div className={classes["seats__ticket-info-to"]}>
            <span className={classes["seats__ticket-info-time"]}>
              {datetimeTo.localized}
            </span>
            <span className={classes["seats__ticket-info-city"]}>
              {selectedTicket.departure.to.city.name}
            </span>
            <span className={classes["seats__ticket-info-station"]}>
              {selectedTicket.departure.to.railway_station_name}
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
                  if (adultsNumber < 5 && adultsNumberRest > 0) {
                    setAdultsNumber(adultsNumber + 1);
                    setAdultsNumberRest(adultsNumberRest - 1);
                  }
                }}
              >
                Взрослых — {adultsNumber}
              </button>
              <span className={classes["seats__count-text"]}>
                Можно добавить еще {adultsNumberRest} пассажиров
              </span>
            </div>
            <div className={classes["seats__count-button-container"]}>
              <button
                className={cn(classes["seats__count-button"], ["yel-button"])}
                onClick={() => {
                  if (kidsNumber < 5 && kidsNumberRest > 0) {
                    setKidsNumber(kidsNumber + 1);
                    setKidsNumberRest(kidsNumberRest - 1);
                  }
                }}
              >
                Детских — {kidsNumber}
              </button>
              <span className={classes["seats__count-text-kids"]}>
                Можно добавить еще {kidsNumberRest} детей до 10 лет. Свое место
                в вагоне, как у взрослых, но дешевле в среднем на 50–65%
              </span>
            </div>

            <div className={classes["seats__count-button-container"]}>
              <button
                onClick={() => {
                  setKidsNumberNoPlace(kidsNumberNoPlace + 1);
                }}
                className={cn(classes["seats__count-button"], ["yel-button"])}
              >
                Детских «без места» — {kidsNumberNoPlace}
              </button>
            </div>
          </div>
        </div>
        <div className={classes["seats__types"]}>
          <h4 className={classes["seats-title"]}>Тип вагона</h4>
          <div className={classes["seats__types-list"]}>
            <div
              className={cn(classes["seats__types-item"], {
                [classes["aviable"]]: currentClassType === "fourth",
              })}
            >
              <FourthClassIcon />
              <span>Сидячий</span>
            </div>

            <div
              className={cn(classes["seats__types-item"], {
                [classes["aviable"]]: currentClassType === "third",
              })}
            >
              <ThirdClassIcon />
              <span>Плацкарт</span>
            </div>

            <div
              className={cn(classes["seats__types-item"], {
                [classes["aviable"]]: currentClassType === "second",
              })}
            >
              <SecondClassIcon />
              <span>Купе</span>
            </div>

            <div
              className={cn(classes["seats__types-item"], {
                [classes["aviable"]]: currentClassType === "first",
              })}
            >
              <FirstClassIcon />
              <span>Люкс</span>
            </div>
          </div>
          <div className={classes["seats__types-info"]}>
            <div className={classes["seats__types-info-wagon"]}>
              <div className={classes["seats__types-info-wagon-number"]}>
                <span>Вагоны</span>
                <span className={classes["number-white"]}>07</span>
                <span className={classes["number-black"]}> 09</span>
              </div>
              <div className={classes["seats__types-info-wagon-text"]}>
                Нумерация вагонов начинается с головы поезда
              </div>
            </div>
            <div className={classes["seats__types-info-wagon-options"]}>
              <div
                className={classes["seats__types-info-wagon-options-number"]}
              >
                <span className={classes["options-number"]}>07</span>
                <span>вагон</span>
              </div>

              <div
                className={classes["seats__types-info-wagon-options-section"]}
              >
                <div
                  className={classes["seats__types-info-wagon-options-seats"]}
                >
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span
                      className={
                        classes["seats__types-info-wagon-options-section-title"]
                      }
                    >
                      Места{" "}
                    </span>{" "}
                    <span>{seats[0]?.coach.available_seats}</span>
                  </div>
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span>Верхние </span>{" "}
                    <span className={classes["text-bold"]}>3</span>
                  </div>
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span>Нижние </span>{" "}
                    <span className={classes["text-bold"]}>8</span>
                  </div>
                </div>
                <div
                  className={classes["seats__types-info-wagon-options-price"]}
                >
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span
                      className={
                        classes["seats__types-info-wagon-options-section-title"]
                      }
                    >
                      Стоимость{" "}
                    </span>
                  </div>
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span className={classes["price"]}>{topPrice}</span>{" "}
                    <span>
                      <RubIcon />
                    </span>
                  </div>
                  <div
                    className={
                      classes["seats__types-info-wagon-options-section"]
                    }
                  >
                    <span className={classes["price"]}>{bottomPrice}</span>{" "}
                    <span>
                      <RubIcon />
                    </span>
                  </div>
                </div>
                <div
                  className={classes["seats__types-info-wagon-options-service"]}
                >
                  <div>
                    <span
                      className={
                        classes["seats__types-info-wagon-options-section-title"]
                      }
                    >
                      Обслуживание ФПК
                    </span>
                    <div
                      className={
                        classes[
                          "seats__types-info-wagon-options-service-options"
                        ]
                      }
                    >
                      <div className={classes["service-option-wrapper"]}>
                        <button
                          className={cn(classes["service-option"], {
                            [classes["included-option"]]:
                              seats[0]?.coach.have_air_conditioning,
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
                            [classes["included-option"]]:
                              seats[0]?.coach.have_wifi,
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
                            [classes["included-option"]]:
                              seats[0]?.coach.is_linens_included,
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
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className={cn(classes["seats-button"], ["shadow-button"])}
      >
        ДАЛЕЕ
      </button>
    </div>
  );
};
