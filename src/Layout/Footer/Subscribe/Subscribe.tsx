import YoutubeIcon from "../../../assets/icons/youtube.svg?react";
import LinkedIn from "../../../assets/icons/linkedIn.svg?react";
import Facebook from "../../../assets/icons/facebook.svg?react";
import Twitter from "../../../assets/icons/twitter.svg?react";
import Google from "../../../assets/icons/google.svg?react";
import cn from "classnames";
import classes from "./subscribe.module.css";

export const Subscribe = () => {
  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    console.log(email);
    //TO DO: logic for email
  };
  return (
    <div className={classes["subscribe"]}>
      <h3 className={classes["subscribe__title"]}>Подписка</h3>
      <form action={handleSubmit} className={classes["subscribe__form"]}>
        <span className={classes["subscribe__text"]}>
          Будьте в курсе событий
        </span>
        <div className={classes["subscribe__form-content"]}>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            className={classes["subscribe__input"]}
          />
          <button className={cn(classes["subscribe__button"], "clear-button")}>
            Отправить
          </button>
        </div>
      </form>
      <h3 className={classes["subscribe__title"]}>Подписывайтесь на нас</h3>
      <div className={classes["subscribe__links"]}>
        <a
          href="#"
          target="_blank"
          className={classes["subscribe__links__item"]}
        >
          <YoutubeIcon className="icon" />
        </a>
        <a
          href="#"
          target="_blank"
          className={classes["subscribe__links__item"]}
        >
          <LinkedIn className="icon" />
        </a>
        <a
          href="#"
          target="_blank"
          className={classes["subscribe__links__item"]}
        >
          <Google className="icon" />
        </a>
        <a
          href="#"
          target="_blank"
          className={classes["subscribe__links__item"]}
        >
          <Facebook className="icon" />
        </a>
        <a
          href="#"
          target="_blank"
          className={classes["subscribe__links__item"]}
        >
          <Twitter className="icon" />
        </a>
      </div>
    </div>
  );
};
