import { useState } from "react";
import { CityInput } from "../CityInput/CityInput";
import SwapIcon from "../../assets/icons/remove.svg?react";

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
        <CityInput value={from} onChange={setFrom} startPlaceholder="Откуда" name="from" />
        <button
          className={classes["direction__swap-button"]}
          onClick={swapDirection}
        >
          <SwapIcon className={classes["direction__swap-icon"]} />
        </button>
        <CityInput value={to} onChange={setTo} startPlaceholder="Куда" name="to" />
      </div>
    </form>
  );
};
