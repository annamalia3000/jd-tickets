import Train from "../../assets/icons/trains.svg?react";
import classes from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={classes["loader"]}>
        <h2 className={classes["loader__title"]}>идет поиск</h2>
        <div className={classes["loader__animation"]}>
            <Train className={classes["loader__icon"]}/>
        </div>
        </div>
  )
}
