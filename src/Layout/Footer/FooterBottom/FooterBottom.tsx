import ArrowIcon from "../../../assets/icons/arrow.svg?react";
import classes from "./footerBottom.module.css";

export const FooterBottom = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={classes["footer-bottom"]}>
      <span className={classes["footer-bottom__logo"]}>Лого</span>
      <div
        onClick={scrollToTop}
        role="button"
        className={classes["footer-bottom__icon"]}
      >
        <ArrowIcon className="icon" />
      </div>

      <span className={classes["footer-bottom__year"]}>2018 WEB</span>
    </div>
  );
};
