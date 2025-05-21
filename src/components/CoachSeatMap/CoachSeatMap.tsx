import { CoachWithSeats } from "../../redux/slicers/seatsSlice";
import cn from "classnames";
import classes from "./CoachSeatMap.module.css";

export interface SelectedSeat {
  coach_id: string;
  seat: number;
}

export interface CoachSeatMapProps {
  data: CoachWithSeats;
  onSelectSeat: (seatNumber: number, coachId: string) => void;
  selectedSeats: { coach_id: string; seat: number }[];
}

const layouts: Record<string, number[][]> = {
  first: Array.from({ length: 9 }, (_, i) => [i * 2 + 1, i * 2 + 2]),
  second: Array.from({ length: 16 }, (_, i) => [i * 2 + 1, i * 2 + 2]),
  third: [
    ...Array.from({ length: 16 }, (_, i) => [i * 2 + 1, i * 2 + 2]),
    ...Array.from({ length: 16 }, (_, i) => [33 + i]),
  ],
  fourth: Array.from({ length: 16 }, (_, i) => [i * 2 + 1, i * 2 + 2]),
};

export const CoachSeatMap = ({
  data,
  onSelectSeat,
  selectedSeats = [],
}: CoachSeatMapProps) => {
  const { class_type, _id: coachId } = data.coach;
  const isThirdClass = class_type === "third";
  const seatMap = layouts[class_type] || [];
  const coupeSeats = isThirdClass ? seatMap.slice(0, 16) : seatMap;
  const sideSeats = isThirdClass ? seatMap.slice(16) : [];

  const handleSeatClick = (seatIndex: number, available: boolean) => {
    if (available) {
     onSelectSeat(seatIndex, coachId);
    }
  };
  const renderSeat = (seatIndex: number) => {
    const seat = data.seats.find((s) => s.index === seatIndex);
    const available = !!seat?.available;
    const selected = selectedSeats.some(
      (s) => s.coach_id === coachId && s.seat === seatIndex
    );

    return (
      <button
        key={seatIndex}
        className={cn(classes.seat, {
          [classes.available]: available,
          [classes.selected]: selected,
          [classes.unavailable]: !available,
        })}
        onClick={() => handleSeatClick(seatIndex, available)}
        disabled={!available}
      >
        {seatIndex}
      </button>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <div className={classes.coupe}>
          {coupeSeats.map((row, i) => (
            <div key={i} className={classes.row}>
              {row.map(renderSeat)}
            </div>
          ))}
        </div>
        {sideSeats.length > 0 && (
          <div className={classes.side}>
            <div className={classes.sideRow}>
              {sideSeats.map((row) => renderSeat(row[0]))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
