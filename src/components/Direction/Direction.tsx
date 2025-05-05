import { useState } from "react";
import { CityInput } from "../CityInput/CityInput";
import { DataInput } from "../DateInput/DateInput";
import { formatDateToISO } from "../../hooks/useDate";
import SwapIcon from "../../assets/icons/remove.svg?react";
import cn from "classnames";
import classes from "./direction.module.css";

type CityProps = {
  _id: string;
  name: string;
};

export const Direction = () => {
  const [fromCity, setFromCity] = useState<CityProps>({ _id: "", name: "" });
  const [toCity, setToCity] = useState<CityProps>({ _id: "", name: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const url = import.meta.env.VITE_HOST;

  const swapDirectionCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const directionFromCityId = fromCity._id;
    const directionToCityId = toCity._id;

    const directionFromDate = formatDateToISO(fromDate);
    const directionToDate = formatDateToISO(toDate);

    const queryParams = new URLSearchParams({
      from_city_id: directionFromCityId,
      to_city_id: directionToCityId,
      ...(directionFromDate && { date_start: directionFromDate }),
      ...(directionToDate && { date_end: directionToDate }),
    });

    const response = await fetch(`${url}/routes?${queryParams}`);

    const data = await response.json();
    console.log("routes", data);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["direction"]}>
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
      <button
        type="submit"
        className={cn(classes["direction__button"], "shadow-button")}
      >
        найти билеты
      </button>
      <input type="hidden" name="fromCity" value={fromCity._id} />
      <input type="hidden" name="toCity" value={toCity._id} />
    </form>
  );
};
