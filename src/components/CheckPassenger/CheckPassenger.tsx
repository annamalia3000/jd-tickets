import PasIcon from "../../assets/icons/user.svg?react";
import classes from "./checkPassenger.module.css";

type PersonInfo = {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: "паспорт" | "свидетельство о рождении";
  document_data: string;
};

type Seat = {
  coach_id: string;
  seat_number: number;
  person_info: PersonInfo;
  is_child: boolean;
  include_children_seat: boolean;
};

export const CheckPassenger = ({ seat }: { seat: Seat }) => {
  const person = seat.person_info;
  const name = `${person.last_name} ${person.first_name} ${person.patronymic}`;
  const docType =
    person.document_type === "паспорт"
      ? "Паспорт РФ"
      : "Свидетельство о рождении";

  const [year, month, day] = person.birthday.split("-");
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <div className={classes["check-passenger"]}>
      <div className={classes["check-passenger-section-icon"]}>
        <span>
          <PasIcon />
        </span>
        <span>{person.is_adult ? "Взрослый" : "Ребенок"}</span>
      </div>
      <div className={classes["check-passenger-section"]}>
        <span>{name}</span>
        <span className={classes["check-passenger-text"]}>
          Пол: {person.gender ? "мужской" : "женский"}
        </span>
        <span className={classes["check-passenger-text"]}>
          Дата рождения: {formattedDate}
        </span>
        <span className={classes["check-passenger-text"]}>
          {docType}: {person.document_data}
        </span>
      </div>
    </div>
  );
};
