import { useState } from "react";
import { CityInput } from "../CityInput/CityInput";
import { DataInput } from "../DateInput/DateInput";
import SwapIcon from "../../assets/icons/remove.svg?react";
import cn from "classnames";
import classes from "./direction.module.css";

export const Direction = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const swapDirectionCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = async (formData: FormData) => {
    const directionFromCity = formData.get("fromCity") as string;
    const directionToCity = formData.get("toCity") as string;

    const directionFromDate = formData.get("fromDate") as string;
    const directionToDate = formData.get("toDate") as string;

    setFromCity(directionFromCity);
    setToCity(directionToCity);
    setFromDate(directionFromDate);
    setToDate(directionToDate);
  };

  return (
    <form action={handleSubmit} className={classes["direction"]}>
      <div className={classes["direction__inputs"]}>
        <div className={classes["direction__city"]}>
          <h4 className={classes["direction__title"]}>Направление</h4>
          <div className={classes["direction__city-input"]}>
            <CityInput
              value={fromCity}
              onChange={setFromCity}
              startPlaceholder="Откуда"
              name="fromCity"
            />
            <button
              className={classes["direction__swap-button"]}
              onClick={swapDirectionCity}
            >
              <SwapIcon className={classes["direction__swap-icon"]} />
            </button>
            <CityInput
              value={toCity}
              onChange={setToCity}
              startPlaceholder="Куда"
              name="toCity"
            />
          </div>
        </div>
        <div className={classes["direction__date"]}>
          <h4 className={classes["direction__title"]}>Дата</h4>
          <div className={classes["direction__date-input"]}>
            <DataInput
              value={fromDate}
              onChange={setFromDate}
              name="fromDate"
            />
            <DataInput value={toDate} onChange={setToDate} name="toDate" />
          </div>
        </div>
      </div>
      <button className={cn(classes["direction__button"], "shadow-button")}>найти билеты</button>
    </form>
  );
};
