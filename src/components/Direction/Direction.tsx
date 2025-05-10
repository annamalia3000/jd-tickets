import { useEffect, useState } from "react";
import { CityInput } from "../CityInput/CityInput";
import { DateInput } from "../DateInput/DateInput";
import { formatDateToISO } from "../../hooks/useDate";
import SwapIcon from "../../assets/icons/remove.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setForwardRoutes,
  setBackwardRoutes,
  setForwardDirection,
  setBackwardDirection,
  setTotalCount,
  setFromDate,
  setToDate,
} from "../../redux/slicers/routesSlice";
import { RootState } from "../../redux/state/store";
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
  const [error, setError] = useState(false);

  const fromDate = useSelector((state: RootState) => state.routes.fromDate);
  const toDate = useSelector((state: RootState) => state.routes.toDate);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = import.meta.env.VITE_HOST;

  const fetchDirection = async (
    from: CityProps,
    to: CityProps,
    start: string,
    end: string,
    isForward: boolean
  ) => {
    const queryParams = new URLSearchParams({
      from_city_id: from._id,
      to_city_id: to._id,
      ...(start && { date_start: formatDateToISO(start) }),
      ...(end && { date_end: formatDateToISO(end) }),
    });

    try {
      const response = await fetch(`${url}/routes?${queryParams}`);
      const data = await response.json();

      if (isForward) {
        dispatch(setForwardRoutes(data.items));
        dispatch(
          setForwardDirection({
            fromCity: from.name,
            toCity: to.name,
            fromDate: start,
            toDate: end,
          })
        );
      } else {
        dispatch(setBackwardRoutes(data.items));
        dispatch(
          setBackwardDirection({
            fromCity: from.name,
            toCity: to.name,
            fromDate: end,
            toDate: start,
          })
        );
      }

      return data.total_count;
    } catch (err) {
      console.error("Ошибка запроса маршрутов:", err);
      return 0;
    }
  };

  useEffect(() => {
    const savedParams = localStorage.getItem("searchParams");
    if (savedParams) {
      const { fromCity, toCity, fromDate, toDate } = JSON.parse(savedParams);
      setFromCity(fromCity);
      setToCity(toCity);
      dispatch(setFromDate(fromDate));
      dispatch(setToDate(toDate));
    }
  }, [location.pathname]);

  const swapDirectionCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleFetch = async (
    from: CityProps,
    to: CityProps,
    fromDate: string,
    toDate: string
  ) => {
    const forwardCount = await fetchDirection(from, to, fromDate, toDate, true);
    const backwardCount = await fetchDirection(
      to,
      from,
      toDate,
      fromDate,
      false
    );

    dispatch(setTotalCount(forwardCount + backwardCount));

    if (forwardCount + backwardCount > 0) {
      if (location.pathname !== "/order") {
        navigate("/order");
      }
    } else {
      setError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      "searchParams",
      JSON.stringify({ fromCity, toCity, fromDate, toDate })
    );

    handleFetch(fromCity, toCity, fromDate, toDate);
  };

  return (
    <form onSubmit={handleSubmit} className={classes["direction"]}>
      {error && (
        <PopUp
          type="error"
          textFirst="По данному маршруту направления не найдены"
          textSecond="Повторите попытку позже"
          onClose={() => {
            setError(false);
            setFromCity({ _id: "", name: "" });
            setToCity({ _id: "", name: "" });
            dispatch(setFromDate(""));
            dispatch(setToDate(""));
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
            <DateInput
              value={fromDate}
              onChange={(value) => dispatch(setFromDate(value))}
              name="fromDate"
            />
            <DateInput
              value={toDate}
              onChange={(value) => dispatch(setToDate(value))}
              name="toDate"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={cn(classes["direction__button"], "shadow-button")}
      >
        найти билеты
      </button>
    </form>
  );
};
