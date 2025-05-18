import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { RootState } from "../../redux/state/store";
import { SeatDirectionCard } from "../SeatDirectionCard/SeatDirectionCard";
import classes from "./seats.module.css";
import {
  setForwardAdults,
  setForwardKids,
  setForwardKidsNoSeat,
  setBackwardAdults,
  setBackwardKids,
  setBackwardKidsNoSeat,
} from "../../redux/slicers/selectedTicketSlice";
import { useState } from "react";

export const Seats = () => {
  const seats = useSelector((state: RootState) => state.seats);
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("selectedTicket.forward:", selectedTicket.forward);
console.log("seats.departure:", seats.departure);
console.log("selectedTicket.backward:", selectedTicket.backward);
console.log("seats.arrival:", seats.arrival);

  const [forwardPassengers, setForwardPassengers] = useState({
    adults: 1,
    kids: 0,
    kidsNoSeat: 0,
  });

  const [backwardPassengers, setBackwardPassengers] = useState({
    adults: 1,
    kids: 0,
    kidsNoSeat: 0,
  });

  const handleClick = () => {
    dispatch(setForwardAdults(forwardPassengers.adults));
    dispatch(setForwardKids(forwardPassengers.kids));
    dispatch(setForwardKidsNoSeat(forwardPassengers.kidsNoSeat));

    if (selectedTicket.backward) {
      dispatch(setBackwardAdults(backwardPassengers.adults));
      dispatch(setBackwardKids(backwardPassengers.kids));
      dispatch(setBackwardKidsNoSeat(backwardPassengers.kidsNoSeat));
    }

    navigate("/passengers");
  };

  return (
    <div className={classes["seats-container"]}>
      <h3 className={classes["seats-title"]}>Выбор мест</h3>

      {selectedTicket.forward &&
        seats.departure &&
        seats.departure.length > 0 && (
          <SeatDirectionCard
            direction="forward"
            directionTicket={selectedTicket.forward}
            seatsData={seats.departure}
            passengers={forwardPassengers}
            setPassengers={setForwardPassengers}
          />
        )}

      {selectedTicket.backward && (
        <SeatDirectionCard
          direction="backward"
          directionTicket={selectedTicket.backward}
          seatsData={seats.arrival}
          passengers={backwardPassengers}
          setPassengers={setBackwardPassengers}
        />
      )}

     
        <button
          onClick={handleClick}
          className={cn(classes["seats-button"], ["shadow-button"])}
        >
          ДАЛЕЕ
        </button>

    </div>
  );
};
