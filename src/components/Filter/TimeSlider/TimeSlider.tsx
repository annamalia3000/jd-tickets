import { useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../redux/slicers/routesSlice";
import { RootState } from "../../../redux/state/store";
import PlusIcon from "../../../assets/icons/toggle-plus.svg?react";
import MinusIcon from "../../../assets/icons/toggle-minus.svg?react";
import ArrowIcon from "../../../assets/icons/fill-arrow.svg?react";
import { RouteProps } from "../../../types/types";
import classes from "./timeSlider.module.css";

type TimeSliderProps = {
  items?: RouteProps[];
  type: "Туда" | "Обратно";
};

const STEP = 10;
const MAX_TIME = 1440;

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const TimeSlider = ({ type }: TimeSliderProps) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.routes);

  const [isOpen, setIsOpen] = useState(false);
  const [valuesDepature, setValuesDepature] = useState<[number, number]>([
    0,
    MAX_TIME,
  ]);
  const [valuesArrival, setValuesArrival] = useState<[number, number]>([
    0,
    MAX_TIME,
  ]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleChangeDepature = (newValues: number[]) => {
    setValuesDepature([newValues[0], newValues[1]]);
  };

  const handleChangeArrival = (newValues: number[]) => {
    setValuesArrival([newValues[0], newValues[1]]);
  };

  const handleChangeCommittedDepature = () => {
    if (type === "Туда") {
      dispatch(
        setFilters({
          ...filters,
          from: {
            ...filters.from,
            minTimeDepature: valuesDepature[0],
            maxTimeDepature: valuesDepature[1],
          },
        })
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          to: {
            ...filters.to,
            minTimeDepature: valuesDepature[0],
            maxTimeDepature: valuesDepature[1],
          },
        })
      );
    }
  };

  const handleChangeCommittedArrival = () => {
    if (type === "Туда") {
      dispatch(
        setFilters({
          ...filters,
          from: {
            ...filters.from,
            minTimeArrival: valuesArrival[0],
            maxTimeArrival: valuesArrival[1],
          },
        })
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          to: {
            ...filters.to,
            minTimeArrival: valuesArrival[0],
            maxTimeArrival: valuesArrival[1],
          },
        })
      );
    }
  };

  const renderRange = (
    values: [number, number],
    onChange: (values: number[]) => void,
    onFinalChange: () => void,
    label: string
  ) => {
    console.log(
      `[${type}] Рендер слайдера: ${label} [${formatTime(
        values[0]
      )} - ${formatTime(values[1])}]`
    );
    return (
      <Range
        values={values}
        step={STEP}
        min={0}
        max={MAX_TIME}
        onChange={onChange}
        onFinalChange={onFinalChange}
        renderTrack={({ props, children }) => {
          const percentage1 = (values[0] / MAX_TIME) * 100;
          const percentage2 = (values[1] / MAX_TIME) * 100;

          return (
            <div {...props} className={classes.track}>
              <div
                className={classes["track-fill"]}
                style={{
                  left: `${percentage1}%`,
                  width: `${percentage2 - percentage1}%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ index, props }) => {
          const { key, ...rest } = props;
          const isZeroTime = values[index] === 0;
          return (
            <div key={key} {...rest} className={classes.thumb}>
              {values[index] !== MAX_TIME && (
                <div className={classes["thumb-value"]}>
                  {isZeroTime ? 0 : formatTime(values[index])}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  };

  return (
    <div className={classes["time-slider"]}>
      <div className={classes["time-slider__header"]}>
        <div className={classes["time-slider__header-title"]}>
          <ArrowIcon
            className={
              type === "Обратно"
                ? classes["time-slider__header-icon"]
                : undefined
            }
          />
          {type}
        </div>
        <button
          onClick={toggleOpen}
          className={classes["time-slider__header-button"]}
        >
          {isOpen ? (
            <MinusIcon className={classes["time-slider__header-icon"]} />
          ) : (
            <PlusIcon className={classes["time-slider__header-icon"]} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className={classes["time-slider__content"]}>
          <div className={classes["time-slider__content-from"]}>
            <span className={classes["time-slider__content-title"]}>
              Время отбытия
            </span>
            <div className={classes["time-slider-container"]}>
              {renderRange(
                valuesDepature,
                handleChangeDepature,
                handleChangeCommittedDepature,
                "отбытие"
              )}
              <div className={classes["slider-text"]}>
                <span>{formatTime(MAX_TIME)}</span>
              </div>
            </div>
          </div>

          <div className={classes["time-slider__content-to"]}>
            <span className={classes["time-slider__content-title"]}>
              Время прибытия
            </span>
            <div className={classes["time-slider-container"]}>
              {renderRange(
                valuesArrival,
                handleChangeArrival,
                handleChangeCommittedArrival,
                "прибытие"
              )}
              <div className={classes["slider-text"]}>
                <span>{formatTime(MAX_TIME)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
