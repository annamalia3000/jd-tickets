import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/state/store";
import { PassengerItem } from "../PassengerItem/PassengerItem";
import { useState } from "react";
import PlusIcon from "../../assets/icons/extra.svg?react";
import { setDepartureTrip } from "../../redux/slicers/orderSlice";
import {
  setForwardAdults,
  setForwardKids,
  setForwardKidsNoSeat,
  setBackwardTotalPrice,
  setForwardTotalPrice,
} from "../../redux/slicers/selectedTicketSlice";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import classes from "./passengersList.module.css";

export const PassengersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTicket = useSelector((state: RootState) => state.selectedTicket);

  const adults = selectedTicket?.forward.adults || 0;
  const kids = selectedTicket?.forward.kids || 0;
  const kidsNoSeat = selectedTicket?.forward.kidsNoSeat || 0;

  const priceForwardAdults = (selectedTicket?.forward.min_price || 0) * adults;
  const priceForwardKids = (selectedTicket?.forward.min_price || 0) * kids;

  const adultsBackward = selectedTicket?.backward?.adults || 0;
  const kidsBackward = selectedTicket?.backward?.kids || 0;

  const priceBackwardAdults = (selectedTicket?.forward.min_price || 0) * adultsBackward;
  const priceBackwardKids = (selectedTicket?.forward.min_price || 0) * kidsBackward;

  const priceForward = priceForwardAdults + priceForwardKids;
  const priceBackward = priceBackwardAdults + priceBackwardKids;

  const route_direction_id = selectedTicket?.forward.departure._id;

  const initialCount = adults + kids + kidsNoSeat;

  const [passengers, setPassengers] = useState<string[]>([
    ...Array(adults).fill("adult"),
    ...Array(kids).fill("child"),
    ...Array(kidsNoSeat).fill("childNoSeat"),
  ]);
  const [validStates, setValidStates] = useState<boolean[]>(Array(initialCount).fill(false));
  const [passengerDataList, setPassengerDataList] = useState<any[]>(Array(initialCount).fill({}));

  const handleRemovePassenger = (index: number) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    const newValidStates = validStates.filter((_, i) => i !== index);
    const newPassengerDataList = passengerDataList.filter((_, i) => i !== index);

    setPassengers(newPassengers);
    setValidStates(newValidStates);
    setPassengerDataList(newPassengerDataList);

    const newAdults = newPassengers.filter((p) => p === "adult").length;
    const newKids = newPassengers.filter((p) => p === "child").length;
    const newKidsNoSeat = newPassengers.filter((p) => p === "childNoSeat").length;

    dispatch(setForwardAdults(newAdults));
    dispatch(setForwardKids(newKids));
    dispatch(setForwardKidsNoSeat(newKidsNoSeat));
  };

  const handleAddPassenger = () => {
    setPassengers((prev) => [...prev, "adult"]);
    setValidStates((prev) => [...prev, false]);
    setPassengerDataList((prev) => [...prev, {}]);
    dispatch(setForwardAdults(prev => prev + 1));
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

  const handleSubmitAll = () => {
    const validPassengerData = passengerDataList.filter((_, idx) => validStates[idx]);

    dispatch(setDepartureTrip({
      route_direction_id,
      seats: validPassengerData,
    }));

    dispatch(setForwardTotalPrice(priceForward));
    dispatch(setBackwardTotalPrice(priceBackward));
    navigate("/payment");
  };

  const isFormValid = validStates.every(Boolean);

  return (
    <div className={classes["passengers-list-container"]}>
      <div className={classes["passengers-list"]}>
        {passengers.map((type, index) => (
          <PassengerItem
            key={index}
            index={index + 1}
            initialType={type as "adult" | "child"}
            onRemove={() => handleRemovePassenger(index)}
            onValidationChange={(isValid) => handleValidityChange(index, isValid)}
            onDataReady={(data) => handlePassengerDataReady(index, data)}
          />
        ))}
      </div>

      <div className={classes["passengers-list-add"]} onClick={handleAddPassenger}>
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
