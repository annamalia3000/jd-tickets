import InfoIcon from "../../assets/icons/info.svg?react";
import cn from "classnames";
import classes from "./popUp.module.css";

type PopUpProps = {
  type?: "error" | "info";
  textFirst: string;
  textSecond: string;
  onClose: () => void;
  isOpen: boolean;
};

export const PopUp = ({
  type = "info",
  textFirst,
  textSecond,
  onClose,
  isOpen,
}: PopUpProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(classes["popup"], type === "info" && classes["popup-info"])}
    >
      <div
        className={cn(
          classes["popup__header"],
          type === "info"
            ? classes["popup__header-info"]
            : classes["popup__header-error"]
        )}
      >
        <InfoIcon className={classes["popup__icon"]} />
      </div>
      <div className={classes["popup__content"]}>
        <p
          className={
            type === "info"
              ? classes["popup__text"]
              : cn(classes["popup__text"], classes["popup__text-error"])
          }
        >
          {textFirst}
        </p>
        <p className={classes["popup__text"]}>{textSecond}</p>
      </div>
      <button
        className={cn(classes["popup__button"], "clear-button")}
        onClick={onClose}
      >
        Понятно
      </button>
    </div>
  );
};
