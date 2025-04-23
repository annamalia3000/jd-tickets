import PhoneIcon from "../../../assets/icons/tel.svg?react";
import MailIcon from "../../../assets/icons/mail.svg?react";
import SkypeIcon from "../../../assets/icons/skype.svg?react";
import LocationIcon from "../../../assets/icons/location.svg?react";
import cn from "classnames";
import classes from "./contacts.module.css";

export const Contacts = () => {
  return (
    <div className={classes["contacts"]}>
      <h3 className={classes["contacts__title"]}>Свяжитесь с нами</h3>
      <div className={classes["contacts__list"]}>
        <a href="tel:+88000000000" className={classes["contacts__item"]}>
          <PhoneIcon className={cn(classes["contacts__icon"], "icon")} />
          <span className={classes["contacts__text"]}>8 (800) 000 00 00</span>
        </a>
        <a href="mailto:inbox@mail.ru" className={classes["contacts__item"]}>
          <MailIcon className={cn(classes["contacts__icon"], "icon")} />
          <span className={classes["contacts__text"]}>inbox@mail.ru</span>
        </a>
        <a href="#" className={classes["contacts__item"]}>
          <SkypeIcon className={cn(classes["contacts__icon"], "icon")} />
          <span className={classes["contacts__text"]}>tu.train.tickets</span>
        </a>
        <a href="#" className={classes["contacts__item"]}>
          <LocationIcon className={cn(classes["contacts__icon"], "icon")} />
          <span className={classes["contacts__text"]}>
            г. Москва <br />
            ул. Московская 27-35 <br />
            555 555
          </span>
        </a>
      </div>
    </div>
  );
};
