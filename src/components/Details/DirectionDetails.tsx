import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";
import ArrowIcon from "../../assets/icons/fill-arrow.svg?react";
import PlusIcon from "../../assets/icons/toggle-plus.svg?react";
import MinusIcon from "../../assets/icons/toggle-minus.svg?react";

import ArrowDirIcon from "../../assets/icons/arrow3.svg?react";

import { useTime } from "../../hooks/useTime";

import cn from "classnames";
import classes from "./details.module.css";
type DirectionDetailsProps = {
  direction: "forward" | "backward";
  isOpen: boolean;
  toggleOpen: () => void;
  isBackward?: boolean;
};

export const DirectionDetails = ({
  direction,
  isOpen,
  toggleOpen,
  isBackward = false,
}: DirectionDetailsProps) => {
    const backward = direction === "backward";
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  const segment = selectedTicket?.[direction];

  const datetimeFrom = useTime(segment?.departure.from.datetime ?? 0, {
    type: "datetime",
  });
  const datetimeTo = useTime(segment?.departure.to.datetime ?? 0, {
    type: "datetime",
  });
  const duration = useTime(segment?.departure.duration ?? 0, {
    type: "duration",
  });

  const dateFrom = datetimeFrom.localized?.split("\n")[1];
  const timeFrom = datetimeFrom.localized?.split("\n")[0];
  const dateTo = datetimeTo.localized?.split("\n")[1];
  const timeTo = datetimeTo.localized?.split("\n")[0];

  return (
    <div className={classes["details__direction"]}>
      <div className={classes["details__section-header"]}>
        <ArrowIcon className={cn({ [classes["arrow-back"]]: isBackward })} />
        <span className={classes["details__section-title"]}>
          {isBackward ? "Обратно" : "Туда"}
        </span>
        <span>{dateFrom}</span>
        {isOpen ? (
          <MinusIcon onClick={toggleOpen} className={classes["details-icon"]} />
        ) : (
          <PlusIcon onClick={toggleOpen} className={classes["details-icon"]} />
        )}
      </div>
      {isOpen && segment && (
        <div className={classes["details__train"]}>
          <div className={classes["details__train-number"]}>
            <span className={classes["details__train-text-tiny"]}>
              № Поезда
            </span>
            <span className={classes["details__train-text-bold"]}>
              {segment.departure.train.name}
            </span>
          </div>
          <div className={classes["details__train-name"]}>
            <span className={classes["details__train-text-tiny"]}>
              Название
            </span>
            <div className={classes["details__train-name-container"]}>
              <span className={classes["details__train-text-bold-city"]}>
                {backward ? segment.departure.to.city.name :segment.departure.from.city.name}
              </span>
              <span className={classes["details__train-text-bold-city"]}>
                {backward?  segment.departure.from.city.name: segment.departure.to.city.name}
              </span>
            </div>
          </div>
          <div className={classes["details__train-time"]}>
            <div className={classes["details__train-item"]}>
              <span className={classes["details__train-text-bold"]}>
                {backward? timeTo : timeFrom}
              </span>
              <span className={classes["details__train-text-grey"]}>
                {backward? dateTo :dateFrom}
              </span>
            </div>
            <div className={classes["details__train-time-duration"]}>
              <span>{duration.formatted}</span>
              <ArrowDirIcon className={backward ? classes["arrow-back"] : ""} />
            </div>
            <div className={classes["details__train-item"]}>
              <span
                className={cn(
                  classes["details__train-text-bold"],
                  classes["details__train-text-right"]
                )}
              >
                { backward? timeFrom:timeTo}
              </span>
              <span className={classes["details__train-text-grey"]}>
                {backward? dateFrom :dateTo}
              </span>
            </div>
          </div>
          <div className={classes["details__train-city"]}>
            <div className={classes["details__train-item"]}>
              <span className={classes["details__train-text-tiny"]}>
                {backward? segment.departure.to.city.name:segment.departure.from.city.name}
              </span>
              <span className={classes["details__train-text-grey"]}>
                {backward?segment.departure.to.railway_station_name :segment.departure.from.railway_station_name}
              </span>
            </div>
            <div className={classes["details__train-item-left"]}>
              <span
                className={cn(
                  classes["details__train-text-tiny"],
                  classes["details__train-text-right"]
                )}
              >
                {backward? segment.departure.from.city.name:segment.departure.to.city.name}
              </span>
              <span className={classes["details__train-text-grey"]}>
                {backward?segment.departure.from.railway_station_name:segment.departure.to.railway_station_name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
