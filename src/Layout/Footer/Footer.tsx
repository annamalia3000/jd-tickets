import { Contacts } from "./Contacts/Contacts";
import { FooterBottom } from "./FooterBottom/FooterBottom";
import { Subscribe } from "./Subscribe/Subscribe";
import classes from "./footer.module.css";

export const Footer = () => {
  return (
    <div id="contacts" className={classes["footer"]}>
      <div className={classes["footer__content"]}>
        <Contacts />
        <Subscribe />
      </div>
      <div className={classes["footer__bottom"]}>
        <FooterBottom />
      </div>
    </div>
  );
};
