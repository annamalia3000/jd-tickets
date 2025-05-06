import { useEffect, useState } from "react";
import { CityInput } from "../CityInput/CityInput";
import { DataInput } from "../DateInput/DateInput";
import { formatDateToISO } from "../../hooks/useDate";
import SwapIcon from "../../assets/icons/remove.svg?react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ добавлено useLocation
import { useDispatch } from "react-redux";
import { setRoutes, setTotalCount } from "../../redux/slicers/routesSlice";
import { PopUp } from "../PopUp/PopUp";
import cn from "classnames";
import classes from "./direction.module.css";

type CityProps = {
  _id: string;
  name: string;
};

type DirectionProps = {
  extraClasses?: boolean;
};

export const Direction = ({ extraClasses }: DirectionProps) => {
  const [fromCity, setFromCity] = useState<CityProps>({ _id: "", name: "" });
  const [toCity, setToCity] = useState<CityProps>({ _id: "", name: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 

  const url = import.meta.env.VITE_HOST;

  const fetchRoutes = async (
    fromCity: CityProps,
    toCity: CityProps,
    fromDate: string,
    toDate: string
  ) => {
    const directionFromCityId = fromCity._id;
    const directionToCityId = toCity._id;

    const directionFromDate = fromDate ? formatDateToISO(fromDate) : "";
    const directionToDate = toDate ? formatDateToISO(toDate) : "";

    const queryParams = new URLSearchParams({
      from_city_id: directionFromCityId,
      to_city_id: directionToCityId,
      ...(directionFromDate && { date_start: directionFromDate }),
      ...(directionToDate && { date_end: directionToDate }),
    });

    try {
      const response = await fetch(`${url}/routes?${queryParams}`);
      const data = await response.json();
      dispatch(setRoutes(data.items));
      dispatch(setTotalCount(data.total_count));
      if (data.total_count > 0) {
        navigate("/order");
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Ошибка запроса маршрутов:", err);
      setError(true);
    }
  };

  useEffect(() => {
    const savedParams = localStorage.getItem("searchParams");
    if (savedParams && location.pathname !== "/") { 
      const { fromCity, toCity, fromDate, toDate } = JSON.parse(savedParams);
      setFromCity(fromCity);
      setToCity(toCity);
      setFromDate(fromDate);
      setToDate(toDate);

      fetchRoutes(fromCity, toCity, fromDate, toDate);
    }
  }, [location.pathname]); 

  const swapDirectionCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      "searchParams",
      JSON.stringify({ fromCity, toCity, fromDate, toDate })
    );

    fetchRoutes(fromCity, toCity, fromDate, toDate);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["direction"]}>
      {error && (
        <PopUp
          type={"error"}
          textFirst={"По данному маршруту направления не найдены"}
          textSecond={"Повторите попытку позже"}
          onClose={() => {
            setError(false);
            setFromCity({ _id: "", name: "" });
            setToCity({ _id: "", name: "" });
            setFromDate("");
            setToDate("");
          }}
          isOpen={error}
        />
      )}
      <div
        className={cn(classes["direction__inputs"], {
          [classes["direction__inputs-row"]]: extraClasses,
        })}
      >
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
