import { useState } from "react";
import { RootState } from "../../redux/state/store";
import { useSelector } from "react-redux";

import PlusIcon from "../../assets/icons/toggle-plus.svg?react";
import MinusIcon from "../../assets/icons/toggle-minus.svg?react";
import PassengerIcon from "../../assets/icons/passenger.svg?react";

import RubIcon from "../../assets/icons/rub.svg?react";

import { DirectionDetails } from "./DirectionDetails";

import classes from "./details.module.css";

const getPassengerWord = (count: number, type: "adult" | "child") => {
  if (type === "adult") {
    if (count === 1) return "взрослый";
    if (count >= 2 && count <= 4) return "взрослых";
    return "взрослых";
  }

  if (type === "child") {
    if (count === 1) return "ребенок";
    if (count >= 2 && count <= 4) return "ребенка";
    return "детей";
  }

  return "";
};

export const Details = () => {
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );

  const adults = selectedTicket?.forward.adults || 0;
  const kids = selectedTicket?.forward.kids || 0;
  const kidsNoSeat = selectedTicket?.forward.kidsNoSeat || 0;
  const kidsSum = kids + kidsNoSeat;
  let priceAdults = 0;
  let priceKids = 0;

  const priceAdultsForward = selectedTicket?.forward.min_price * adults || 0;
  const priceKidsForward = selectedTicket?.forward.min_price * kids || 0;

  if (selectedTicket?.backward) {
    const priceAdultsBackward =
      selectedTicket?.backward?.min_price * adults || 0;
    const priceKidsBackward = selectedTicket?.backward.min_price * kids || 0;
    priceAdults = priceAdultsForward + priceAdultsBackward;
    priceKids = priceKidsForward + priceKidsBackward;
  } else {
    priceAdults = priceAdultsForward;
    priceKids = priceKidsForward;
  }

  const priceTotal = priceAdults + priceKids;

  const [isOpenFrom, setIsOpenFrom] = useState(true);

  const [isOpenBack, setIsOpenBack] = useState(true);

  const [isOpenPas, setIsOpenPas] = useState(true);
  const toggleOpenPas = () => setIsOpenPas(!isOpenPas);

  return (
    <div className={classes["details"]}>
      <div className={classes["details-title"]}>Детали поездки</div>

      <DirectionDetails
        direction="forward"
        isOpen={isOpenFrom}
        toggleOpen={() => setIsOpenFrom(!isOpenFrom)}
      />

      {selectedTicket.backward && (
        <DirectionDetails
          direction="backward"
          isOpen={isOpenBack}
          toggleOpen={() => setIsOpenBack(!isOpenBack)}
          isBackward
        />
      )}

      <div className={classes["details-passsengers"]}>
        <div className={classes["details__section-header"]}>
          <PassengerIcon />
          <span className={classes["details__section-title"]}>Пассажиры</span>
          {isOpenPas ? (
            <MinusIcon
              onClick={toggleOpenPas}
              className={classes["details-icon"]}
            />
          ) : (
            <PlusIcon
              onClick={toggleOpenPas}
              className={classes["details-icon"]}
            />
          )}
        </div>
        {isOpenPas && (
          <div className={classes["details__passengers-info"]}>
            {adults > 0 && (
              <div className={classes["details__passengers-adults"]}>
                <span className={classes["details__train-text-tiny"]}>
                  {adults} {getPassengerWord(adults, "adult")}
                </span>
                <span className={classes["details__train-text-bold"]}>
                  {priceAdults} <RubIcon />
                </span>
              </div>
            )}
            {kidsSum > 0 && (
              <div className={classes["details__passengers-kids"]}>
                <span className={classes["details__train-text-tiny"]}>
                  {kidsSum} {getPassengerWord(kidsSum, "child")}
                </span>
                <span className={classes["details__train-text-bold"]}>
                  {priceKids} <RubIcon />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={classes["details__total"]}>
        <span className={classes["details__total-text"]}>Итог</span>
        <span className={classes["details__total-price"]}>
          {priceTotal} <RubIcon className={classes["details__total-icon"]} />
        </span>
      </div>
    </div>
  );
};
