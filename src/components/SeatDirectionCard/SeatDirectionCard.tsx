import { useEffect, useState } from "react";
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
import { CoachSeatMap } from "../CoachSeatMap/CoachSeatMap";
import {
  setForwardSelectedSeats,
  setBackwardSelectedSeats,
} from "../../redux/slicers/selectedTicketSlice";
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
  setPassengers: (p: {
    adults: number;
    kids: number;
    kidsNoSeat: number;
  }) => void;
};

export const SeatDirectionCard = ({
  direction,
  directionTicket,
  seatsData,
  passengers,
  setPassengers,
}: SeatDirectionCardProps) => {
  const [isNutritionActive, setIsNutritionActive] = useState(false);
  const [selectedCoachIndex, setSelectedCoachIndex] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<
    { coach_id: string; seat: number }[]
  >([]);

  const selectedCoachData = seatsData[selectedCoachIndex];
  const coach = selectedCoachData.coach;
  const duration = useSeconds(directionTicket.departure.duration ?? 0);
  const classType = coach?.class_type;

  const dispatch = useDispatch();
  const backward = direction === "backward";

useEffect(() => {
  if (selectedSeats.length > 0) {
    if (backward) {
      dispatch(setBackwardSelectedSeats(selectedSeats));
    } else {
      dispatch(setForwardSelectedSeats(selectedSeats));
    }
  }
}, [selectedSeats]);

  const handleBack = () => {
    dispatch(clearSelectedTicket());
  };

  const totalSeatsNeeded = passengers.adults + passengers.kids;

  const handleSelectSeat = (seatIndex: number) => {
    const coachId = coach._id;
    const seatObj = { coach_id: coachId, seat: seatIndex };

    const alreadySelected = selectedSeats.find(
      (s) => s.coach_id === coachId && s.seat === seatIndex
    );

    if (alreadySelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) => !(s.coach_id === coachId && s.seat === seatIndex)
        )
      );
    } else {
      if (selectedSeats.length >= totalSeatsNeeded) {
        setSelectedSeats([...selectedSeats.slice(1), seatObj]);
      } else {
        setSelectedSeats([...selectedSeats, seatObj]);
      }
    }
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
      <div
        className={
          backward
            ? classes["seats__controls-back"]
            : classes["seats__controls"]
        }
      >
        <ArrowIcon
          className={
            backward
              ? classes["seats__controls-icon-back"]
              : classes["seats__controls-icon"]
          }
        />
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
              onClick={() =>
                passengers.adults < 5 &&
                setPassengers({ ...passengers, adults: passengers.adults + 1 })
              }
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
              onClick={() =>
                passengers.kids < 5 &&
                setPassengers({ ...passengers, kids: passengers.kids + 1 })
              }
            >
              Детских — {passengers.kids}
            </button>
            <span className={classes["seats__count-text-kids"]}>
              Можно добавить еще {5 - passengers.kids} детей до 10 лет
            </span>
          </div>

          <div className={classes["seats__count-button-container"]}>
            <button
              onClick={() =>
                setPassengers({
                  ...passengers,
                  kidsNoSeat: passengers.kidsNoSeat + 1,
                })
              }
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
          <div className={classes["seats__types-info-wagon-container"]}>
            <div className={classes["seats__types-info-wagons"]}>
              <span>Вагоны</span>
              {seatsData.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedCoachIndex(index)}
                  className={cn({
                    [classes["number-white"]]: selectedCoachIndex === index,
                    [classes["number-black"]]: selectedCoachIndex !== index,
                  })}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
            <span>Нумерация вагонов начинается с головы поезда</span>
          </div>

          <div className={classes["seats__types-info-wagon-options"]}>
            <div className={classes["seats__types-info-wagon-options-number"]}>
              <span className={classes["options-number"]}>
                {String(selectedCoachIndex + 1).padStart(2, "0")}
              </span>{" "}
              вагон
            </div>
            <div className={classes["seats__types-info-wagon-options-seats"]}>
              <div
                className={classes["seats__types-info-wagon-options-section"]}
              >
                <span
                  className={
                    classes["seats__types-info-wagon-options-section-title"]
                  }
                >
                  Места{" "}
                </span>
                <span>{coach?.available_seats}</span>
              </div>
              {classType === "third" && (
                <>
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
                </>
              )}
            </div>

            <div className={classes["seats__types-info-wagon-options-price"]}>
              <span
                className={
                  classes["seats__types-info-wagon-options-section-title"]
                }
              >
                Стоимость{" "}
              </span>
              {classType === "third" ? (
                <>
                  <span className={classes["price"]}>
                    {topPrice}{" "}
                    <RubIcon className={classes["seats__rub-icon"]} />
                  </span>
                  <span className={classes["price"]}>
                    {bottomPrice}{" "}
                    <RubIcon className={classes["seats__rub-icon"]} />
                  </span>
                </>
              ) : (
                <span className={classes["price"]}>
                  {topPrice} <RubIcon className={classes["seats__rub-icon"]} />
                </span>
              )}
            </div>

            <div className={classes["seats__types-info-wagon-options-service"]}>
              <span
                className={
                  classes["seats__types-info-wagon-options-section-title"]
                }
              >
                Обслуживание ФПК
              </span>
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

      <div>
        <CoachSeatMap
          data={selectedCoachData}
          onSelectSeat={handleSelectSeat}
          selectedSeats={selectedSeats.filter((s) => s.coach_id === coach._id)}
        />
      </div>
    </div>
  );
};
