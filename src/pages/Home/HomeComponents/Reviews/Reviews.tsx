import Circle from "../../../../assets/icons/circle.svg?react";
import cn from "classnames";
import classes from "./reviews.module.css";

export const Reviews = () => {
  return (
    <div id="reviews" className={classes["reviews"]}>
      <h3 className={classes["reviews__title"]}>отзывы</h3>
      <div className={classes["reviews__content"]}>
        <div className={classes["reviews__item"]}>
          <img
            src="/img/review1.png"
            alt="аватар"
            className={classes["reviews__item-img"]}
          />

          <div className={classes["reviews__item-content"]}>
            <h4 className={classes["reviews__item-name"]}>
              Екатерина Вальнова
            </h4>
            <div
              className={cn(
                classes["reviews__item-text"],
                classes["reviews__item-text-first"]
              )}
            >
              Доброжелательные подсказки <br />
              на всех этапах помогут правильно заполнить <br />
              поля и без затруднений купить авиа или ж/д <br />
              билет, даже если вы заказываете онлайн билет
              <br />
              впервые.
            </div>
          </div>
        </div>
        <div className={classes["reviews__item"]}>
          <img
            src="/img/review2.png"
            alt="аватар"
            className={classes["reviews__item-img"]}
          />
          <div className={classes["reviews__item-content"]}>
            <h4 className={classes["reviews__item-name"]}>Евгений Стрыкало</h4>
            <div className={classes["reviews__item-text"]}>
              СМС-сопровождение до посадки <br />
              Сразу после оплаты ж/д билетов <br />
              и за 3 часа до отправления мы пришлем <br />
              вам СМС-напоминание о поездке.
            </div>
          </div>
        </div>
      </div>
      <div className={classes["reviews__more"]}>
        <Circle
          className={cn(classes["circle__icon"], classes["circle__icon-first"])}
        />
        <Circle className={classes["circle__icon"]} />
        <Circle className={classes["circle__icon"]} />
        <Circle className={classes["circle__icon"]} />
        <Circle className={classes["circle__icon"]} />
      </div>
    </div>
  );
};
