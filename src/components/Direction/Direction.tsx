import { useState } from "react";
import SwapIcon from "../../assets/icons/remove.svg?react";
import LocationIcon from "../../assets/icons/location.svg?react";
import classes from "./direction.module.css";

export const Direction = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const swapDirection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = async (formData: FormData) => {
    const directionFrom = formData.get("from") as string;
    const directionTo = formData.get("to") as string;

    setFrom(directionFrom);
    setTo(directionTo);
  };

  return (
    <form action={handleSubmit} className={classes["direction"]}>
      <h4 className={classes["direction__title"]}>Направление</h4>
      <div className={classes["direction__inputs"]}>
        <div className={classes["direction__input-container"]}>
          <input
            type="text"
            name="from"
            placeholder="Откуда"
            className={classes["direction__input"]}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <LocationIcon className={classes["direction__input-icon"]} />
        </div>
        <button
          className={classes["direction__swap-button"]}
          onClick={swapDirection}
        >
          <SwapIcon className={classes["direction__swap-icon"]} />
        </button>
        <div className={classes["direction__input-container"]}>
          <input
            type="text"
            name="to"
            placeholder="Куда"
            value={to}
            className={classes["direction__input"]}
            onChange={(e) => setTo(e.target.value)}
          />
          <LocationIcon className={classes["direction__input-icon"]} />
        </div>
      </div>
    </form>
  );
};
