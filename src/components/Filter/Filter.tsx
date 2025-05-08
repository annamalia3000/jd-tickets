import { useDispatch, useSelector } from "react-redux";
import { DateInput } from "../DateInput/DateInput";
import {
  setFromDate,
  setToDate,
  setFilters,
} from "../../redux/slicers/routesSlice";
import { RootState } from "../../redux/state/store";

import FirstClassIcon from "../../assets/icons/filter/first-class.svg?react";
import SecondClassIcon from "../../assets/icons/filter/second-class.svg?react";
import ThirdClassIcon from "../../assets/icons/filter/third-class.svg?react";
import FourthClassIcon from "../../assets/icons/filter/fourth-class.svg?react";
import WiFiIcon from "../../assets/icons/filter/wifi.svg?react";
import ExpressIcon from "../../assets/icons/filter/express.svg?react";

import { PriceSlider } from "./PriceSlider/PriceSlider";
import classes from "./filter.module.css";

type FilterKey =
  | "have_second_class"
  | "have_third_class"
  | "have_fourth_class"
  | "have_first_class"
  | "have_wifi"
  | "is_express";

export const Filter = () => {
  const dispatch = useDispatch();

  const fromDate = useSelector((state: RootState) => state.routes.fromDate);
  const toDate = useSelector((state: RootState) => state.routes.toDate);
  const filters = useSelector((state: RootState) => state.routes.filters);

  const toggles = [
    { key: "have_second_class", label: "Купе", icon: <SecondClassIcon /> },
    { key: "have_third_class", label: "Плацкарт", icon: <ThirdClassIcon /> },
    { key: "have_fourth_class", label: "Сидячий", icon: <FourthClassIcon /> },
    { key: "have_first_class", label: "Люкс", icon: <FirstClassIcon /> },
    { key: "have_wifi", label: "Wi-Fi", icon: <WiFiIcon /> },
    { key: "is_express", label: "Экспресс", icon: <ExpressIcon /> },
  ];

  const handleToggle = (key: FilterKey) => {
    dispatch(
      setFilters({
        ...filters,
        [key]: !filters[key],
      })
    );
  };

  return (
    <div className={classes["filter"]}>
      <div className={classes["filter__date"]}>
        <div className={classes["filter__date-from"]}>
          <h4 className={classes["filter__text"]}>Дата поездки</h4>
          <div className={classes["filter__date-input"]}>
            <DateInput
              value={fromDate}
              onChange={(value) => dispatch(setFromDate(value))}
              name="fromDate"
            />
          </div>
        </div>

        <div className={classes["filter__date-to"]}>
          <h4 className={classes["filter__text"]}>Дата возврата</h4>
          <div className={classes["filter__date-input"]}>
            <DateInput
              value={toDate}
              onChange={(value) => dispatch(setToDate(value))}
              name="toDate"
            />
          </div>
        </div>
      </div>

      <div className={classes["filter__toggles"]}>
        {toggles.map(({ key, label, icon }) => (
          <div className={classes["filter__toggle"]} key={key}>
            <div className={classes["filter__toggle-options"]}>
              <div className={classes["filter__toggle-icon"]}>{icon}</div>
              <div className={classes["filter__toggle-label"]}>{label}</div>
            </div>
            <label className={classes["filter__toggle-switch"]}>
              <input
                type="checkbox"
                checked={Boolean(filters[key as keyof typeof filters])}
                onChange={() => handleToggle(key as FilterKey)}
              />
              <span className={classes["filter__toggle-slider"]}></span>
            </label>
          </div>
        ))}{" "}
      </div>

      <div className={classes["filter__price"]}>
        <h4 className={classes["filter__text"]}>Стоимость</h4>
        <div className={classes["filter__price-container"]}>
          <span className={classes["filter__price-slider"]}>
            <PriceSlider />
          </span>
        </div>
      </div>
    </div>
  );
};
