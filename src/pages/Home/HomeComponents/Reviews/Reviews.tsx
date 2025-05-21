import { useState } from "react";
import { ReviewItem } from "./Reviews components/ReviewItem";
import Circle from "../../../../assets/icons/circle.svg?react";
import cn from "classnames";
import classes from "./reviews.module.css";

export const Reviews = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCircle, _setActiveCircle] = useState(0); //логика для изменения цвета circle при прокрутке отзывов

  const reviewsData = [
    {
      id: 1,
      img: "/img/review1.png",
      name: "Екатерина Вальнова",
      text: `Доброжелательные подсказки
            на всех этапах помогут правильно заполнить
            поля и без затруднений купить авиа или ж/д
            билет, даже если вы заказываете онлайн билет
            впервые.`,
    },
    {
      img: "/img/review2.png",
      id: 2,
      name: "Евгений Стрыкало",
      text: `СМС-сопровождение до посадки
              Сразу после оплаты ж/д билетов
              и за 3 часа до отправления мы пришлем
              вам СМС-напоминание о поездке.`,
    },
    {
      img: "/img/review2.png",
      id: 3,
      name: "Отзыв 3",
      text: `Отзыв 3`,
    },
    {
      img: "/img/review2.png",
      id: 4,
      name: "Отзыв 4",
      text: `Отзыв 4`,
    },
  ];

  return (
    <div id="reviews" className={classes["reviews"]}>
      <h3 className={classes["reviews__title"]}>отзывы</h3>
      <div className={classes["reviews__content"]}>
        {reviewsData.map((review) => (
          <ReviewItem
            key={review.id}
            img={review.img}
            name={review.name}
            text={review.text}
          />
        ))}
      </div>
      <div className={classes["reviews__more"]}>
        {reviewsData.map((_, index) => (
          <Circle
            key={index}
            className={cn(
              classes["circle__icon"],
              activeCircle === index && classes["circle__icon-active"]
            )}
          />
        ))}
      </div>
    </div>
  );
};
