import RubIcon from "../../assets/icons/rub.svg?react";

import classes from "./seatsList.module.css";

interface SeatsListProps {
  seats: {
    fourth?: number;
    third?: number;
    second?: number;
    first?: number;
  };
  price: {
    fourth?: { bottom_price: number };
    third?: { bottom_price: number };
    second?: { bottom_price: number };
    first?: { bottom_price: number };
  };
}

export const SeatsList = ({ seats, price }: SeatsListProps) => {
  const seatTypes = [
    { key: "fourth", label: "Сидячий" },
    { key: "third", label: "Плацкарт" },
    { key: "second", label: "Купе" },
    { key: "first", label: "Люкс" },
  ] as const;

  return (
    <div className={classes["seats"]}>
      {seatTypes.map(({ key, label }) => {
        const seatCount = seats[key];
        const seatPrice = price[key]?.bottom_price;
        if (!seatCount || !seatPrice) return null;

        return (
          <div key={key} className={classes["seats__item"]}>
            <span className={classes["seats__item-title"]}>{label}</span>
            <span className={classes["seats__item-count"]}>
              {seatCount}
            </span>
            <span className={classes["seats__item-text"]}>от</span>
            <span className={classes["seats__item-price"]}>
              {seatPrice}
            </span>
            <span className={classes["seats__item-icon"]}>
              <RubIcon />
            </span>
  
          </div>
        );
      })}
    </div>
  );
};
