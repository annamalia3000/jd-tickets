import { useState } from "react";
import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import ArrowIcon from "../../assets/icons/fill-arrow.svg?react";
import PlusIcon from "../../assets/icons/toggle-plus.svg?react";
import MinusIcon from "../../assets/icons/toggle-minus.svg?react";
import PassengerIcon from "../../assets/icons/passenger.svg?react";
import ArrowDirIcon from "../../assets/icons/arrow3.svg?react";
import RubIcon from "../../assets/icons/rub.svg?react";
import { useTime } from "../../hooks/useTime";

import cn from "classnames";
import classes from "./details.module.css";

const getPassengerWord = (count: number, type: "adult" | "child") => {
  if (type === "adult") {
    if (count === 1) return "взрослый";
    if (count >= 2 && count <= 4) return "взрослых";
    return "взрослых";
  }

  if (type === "child") {
    if (count === 1) return "ребенок";
    if (count >= 2 && count <= 4) return "ребенка";
    return "детей";
  }

  return "";
};

export const Details = () => {
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );

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
  const dateFrom = datetimeFrom.localized?.split("\n")[1];
  const timeFrom = datetimeFrom.localized?.split("\n")[0];

  const datetimeTo = useFormattedTime(
    selectedTicket?.departure.to.datetime,
    "datetime"
  );
  const dateTo = datetimeTo.localized?.split("\n")[1];
  const timeTo = datetimeTo.localized?.split("\n")[0];

  const duration = useFormattedTime(
    selectedTicket?.departure.duration,
    "duration"
  );

  const adults = selectedTicket?.adults || 0;
  const kids = selectedTicket?.kids || 0;
  const kidsNoSeat = selectedTicket?.kidsNoSeat || 0;
  const kidsSum = kids + kidsNoSeat;

  const priceAdults = selectedTicket?.min_price * adults || 0;
  const priceKids = selectedTicket?.min_price * kids || 0;
  const priceTotal = priceAdults + priceKids;

  const [isOpenFrom, setIsOpenFrom] = useState(true);
  const toggleOpenFrom = () => setIsOpenFrom(!isOpenFrom);

  const [isOpenPas, setIsOpenPas] = useState(true);
  const toggleOpenPas = () => setIsOpenPas(!isOpenPas);

  return (
    <div className={classes["details"]}>
      <div className={classes["details-title"]}>Детали поездки</div>
      <div className={classes["details__direction"]}>
        <div className={classes["details__section-header"]}>
          <ArrowIcon />
          <span className={classes["details__section-title"]}>Туда</span>
          <span>{dateFrom}</span>
          {isOpenFrom ? (
            <MinusIcon
              onClick={toggleOpenFrom}
              className={classes["details-icon"]}
            />
          ) : (
            <PlusIcon
              onClick={toggleOpenFrom}
              className={classes["details-icon"]}
            />
          )}
        </div>
        {isOpenFrom && (
          <div className={classes["details__train"]}>
            <div className={classes["details__train-number"]}>
              <span className={classes["details__train-text-tiny"]}>№ Поезда</span>
              <span className={classes["details__train-text-bold"]}>
                {selectedTicket?.departure.train.name}
              </span>
            </div>
            <div className={classes["details__train-name"]}>
              <span className={classes["details__train-text-tiny"]}>Название</span>
              <div className={classes["details__train-name-container"]}>
                <span className={classes["details__train-text-bold-city"]}>
                  {selectedTicket?.departure.from.city.name}
                </span>
                <span className={classes["details__train-text-bold-city"]}>
                  {selectedTicket?.departure.to.city.name}
                </span>
              </div>
            </div>
            <div className={classes["details__train-time"]}>
              <div className={classes["details__train-item"]}>
                <span className={classes["details__train-text-bold"]}>
                  {timeFrom}
                </span>
                <span className={classes["details__train-text-grey"]}>
                  {dateFrom}
                </span>
              </div>
              <div className={classes["details__train-time-duration"]}>
                <span>{duration.formatted}</span>
                <span><ArrowDirIcon /></span>
              </div>
              <div className={classes["details__train-item"]}>
                <span className={cn(classes["details__train-text-bold"], classes["details__train-text-right"])}>
                  {timeTo}
                </span>
                <span className={classes["details__train-text-grey"]}>
                  {dateTo}
                </span>
              </div>
            </div>
            <div className={classes["details__train-city"]}>
              <div className={classes["details__train-item"]}>
                <span className={classes["details__train-text-tiny"]}>
                  {selectedTicket?.departure.from.city.name}
                </span>
                <span className={classes["details__train-text-grey"]}>
                  {selectedTicket?.departure.from.railway_station_name}
                </span>
              </div>
              <div className={classes["details__train-item"]}>
                <span className={cn(classes["details__train-text-tiny"], classes["details__train-text-right"])}>
                  {selectedTicket?.departure.to.city.name}
                </span>
                <span className={classes["details__train-text-grey"]}>
                  {selectedTicket?.departure.to.railway_station_name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={classes["details-passsengers"]}>
        <div className={classes["details__section-header"]}>
          <PassengerIcon />
          <span className={classes["details__section-title"]}>Пассажиры</span>
          {isOpenPas ? (
            <MinusIcon
              onClick={toggleOpenPas}
              className={classes["details-icon"]}
            />
          ) : (
            <PlusIcon
              onClick={toggleOpenPas}
              className={classes["details-icon"]}
            />
          )}
        </div>
        {isOpenPas && (
          <div className={classes["details__passengers-info"]}>
            {adults > 0 && (
              <div className={classes["details__passengers-adults"]}>
                <span className={classes["details__train-text-tiny"]}>
                  {adults} {getPassengerWord(adults, "adult")}
                </span>
                <span className={classes["details__train-text-bold"]}>
                  {priceAdults} <RubIcon />
                </span>
              </div>
            )}
            {kidsSum > 0 && (
              <div className={classes["details__passengers-kids"]}>
                <span className={classes["details__train-text-tiny"]}>
                  {kidsSum} {getPassengerWord(kidsSum, "child")}
                </span>
                <span className={classes["details__train-text-bold"]}>
                  {priceKids} <RubIcon />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={classes["details__total"]}>
        <span className={classes["details__total-text"]}>Итог</span>
        <span className={classes["details__total-price"]}>{priceTotal} <RubIcon  className={classes["details__total-icon"]}/></span>
      </div>
    </div>
  );
};
