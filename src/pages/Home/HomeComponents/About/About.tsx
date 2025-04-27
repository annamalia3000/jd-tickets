import cn from "classnames";
import classes from "./about.module.css";

export const About = () => {
  return (
    <div id='about' className={classes["about"]}>
      <h3 className={classes["about__title"]}>о нас</h3>
      <div className={classes["about__content"]}>
        <p className={classes["about__text"]}>
          Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы
          наблюдаем, как с каждым днем все больше людей заказывают жд билеты
          через интернет.
        </p>
        <p className={classes["about__text"]}>
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика,
          но стоит ли это делать? Мы расскажем о преимуществах заказа через
          интернет.
        </p>
        <p className={cn(classes["about__text"], classes["about__text-b"]) }>
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br/>
          Благодаря динамическому ценообразованию цена на билеты в это время
          самая низкая.
        </p>
      </div>
    </div>
  );
};
