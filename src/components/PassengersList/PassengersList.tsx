import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/state/store";
import { PassengerItem } from "../PassengerItem/PassengerItem";
import { useState } from "react";
import PlusIcon from "../../assets/icons/extra.svg?react";
import { setDepartureTrip } from "../../redux/slicers/orderSlice";
import cn from "classnames";
import classes from "./passengersList.module.css";

export const PassengersList = () => {
  const dispatch = useDispatch();
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );

  const adults = selectedTicket?.adults || 0;
  const kids = selectedTicket?.kids || 0;
  const kidsNoSeat = selectedTicket?.kidsNoSeat || 0;

  const initialCount = adults + kids + kidsNoSeat;

  const [passengers, setPassengers] = useState<string[]>([
    ...Array(adults).fill("adult"),
    ...Array(kids + kidsNoSeat).fill("child"),
  ]);
  const [validStates, setValidStates] = useState<boolean[]>(
    Array(initialCount).fill(false)
  );
  const [passengerDataList, setPassengerDataList] = useState<any[]>(
    Array(initialCount).fill(null)
  );

  const handleRemovePassenger = (indexToRemove: number) => {
    setPassengers((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setValidStates((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setPassengerDataList((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleAddPassenger = () => {
    setPassengers((prev) => [...prev, "adult"]);
    setValidStates((prev) => [...prev, false]);
    setPassengerDataList((prev) => [...prev, null]);
  };

  const handleValidityChange = (index: number, isValid: boolean) => {
    setValidStates((prev) => {
      const updated = [...prev];
      updated[index] = isValid;
      return updated;
    });
  };

  const handlePassengerDataReady = (index: number, data: any) => {
    setPassengerDataList((prev) => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  };

  const isFormValid = validStates.every(Boolean);

  const handleSubmitAll = () => {
    dispatch(
      setDepartureTrip({
        route_direction_id: "123431", // заменить на реальный ID
        seats: passengerDataList,
      })
    );
  };

  return (
    <div className={classes["passengers-list-container"]}>
      <div className={classes["passengers-list"]}>
        {passengers.map((type, index) => (
          <PassengerItem
            key={index}
            index={index + 1}
            initialType={type as "adult" | "child"}
            onRemove={() => handleRemovePassenger(index)}
            onValidationChange={(isValid) =>
              handleValidityChange(index, isValid)
            }
            onDataReady={(data) => handlePassengerDataReady(index, data)}
          />
        ))}
      </div>

      <div
        className={classes["passengers-list-add"]}
        onClick={handleAddPassenger}
      >
        <span>Добавить пассажира</span>
        <PlusIcon />
      </div>

      <div className={classes["passengers-list-button-container"]}>
        <button
          disabled={!isFormValid}
          className={cn(classes["passengers-list-button"], "shadow-button")}
          onClick={handleSubmitAll}
        >
          ДАЛЕЕ
        </button>
      </div>
    </div>
  );
};
