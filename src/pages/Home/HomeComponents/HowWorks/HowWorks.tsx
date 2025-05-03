import HowFirstIcon from "../../../../assets/icons/how1.svg?react";
import HowSecondIcon from "../../../../assets/icons/how2.svg?react";
import HowThirdIcon from "../../../../assets/icons/how3.svg?react";
import cn from "classnames";
import classes from "./howWorks.module.css";

export const HowWorks = () => {
  return (
    <div id="how" className={classes["how"]}>
      <div className={classes["how__header"]}>
      <h3 className={classes["how__title"]}>Как это работает</h3>
      <button className={cn(classes["how__button"], "dark-button")}>Узнать больше</button>
      </div>
      <div className={classes["how__content"]}>
        <div className={classes["how__item"]}>
          <HowFirstIcon className={classes["how__icon"]}/>
          <p className={cn(classes["how__icon-text"], classes["how__icon-text-first"])}>Удобный заказ на сайте</p>
        </div>
        <div className={classes["how__item"]}>
          <HowSecondIcon  className={classes["how__icon"]}/>
          <p className={cn(classes["how__icon-text"], classes["how__icon-text-second"])}>Нет необходимости ехать в офис</p>
        </div>
        <div className={classes["how__item"]}>
          <HowThirdIcon className={classes["how__icon"]}/>
          <p className={classes["how__icon-text"]}>Огромный выбор направлений</p>
        </div>
      </div>
    
    </div>
  );
};
