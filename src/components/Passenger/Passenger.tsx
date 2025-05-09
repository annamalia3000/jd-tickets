import { useState } from "react";
import MinusIcon from "../../assets/icons/pas-minus.svg?react";
import PlusIcon from "../../assets/icons/pas-plus.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import classes from "./passenger.module.css";
import { DateInput } from "../DateInput/DateInput";
type PassengerProps = {
  index: number;
  onRemove: () => void;
};

export const Passenger = ({ index = 1, onRemove }: PassengerProps) => {
  const [docType, setDocType] = useState("passport");
  const [birthCertNumber, setBirthCertNumber] = useState("");
  const [birthCertError, setBirthCertError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleBirthCertChange = (e) => {
    const value = e.target.value.toUpperCase();
    setBirthCertNumber(value);

    const regex = /^[IVXLCDM]{1,4}-[А-Я]{2}-\d{6}$/;
    if (!regex.test(value)) {
      setBirthCertError(
        "Номер свидетельства о рождении указан некорректно. Пример: VIII-ВП-123456"
      );
    } else {
      setBirthCertError("");
    }
  };

  return (
    <form className={classes["passenger-form"]}>
      <div className={classes["passenger-form__header"]}>
        <h4 className={classes["passenger-form__header-title"]}>
          <button
            className={classes["passenger-form__header-open-button"]}
            onClick={toggleOpen}
          >
            {isOpen ? (
              <MinusIcon className={classes["passenger-form__header-icon"]} />
            ) : (
              <PlusIcon className={classes["passenger-form__header-icon"]} />
            )}
          </button>
          Пассажир {index}
        </h4>
        <button
          type="button"
          onClick={onRemove}
          className={classes["passenger-form__header-button"]}
        >
          <CrossIcon />
        </button>
      </div>

      {isOpen && (
        <div className={classes["passenger-form__info"]}>
          <div className={classes["passenger-form__select"]}>
            <select className={classes["passenger-form-text"]}>
              <option>Взрослый</option>
              <option>Детский</option>
            </select>
          </div>

          <div className={classes["passenger-form__name"]}>
            <label className={classes["passenger-form-label"]}>
              <span>Фамилия</span>
              <input
                type="text"
                placeholder="Фамилия"
                className={classes["passenger-form-input"]}
              />
            </label>
            <label className={classes["passenger-form-label"]}>
              <span>Имя</span>
              <input
                type="text"
                placeholder="Имя"
                className={classes["passenger-form-input"]}
              />
            </label>
            <label className={classes["passenger-form-label"]}>
              <span>Отчество</span>
              <input
                type="text"
                placeholder="Отчество"
                className={classes["passenger-form-input"]}
              />
            </label>
          </div>

          <div className={classes["passenger-form__sex-age"]}>
            <div>
              <label>
                <input type="radio" name={`gender-${index}`} value="M" />М
              </label>
              <label>
                <input type="radio" name={`gender-${index}`} value="F" />Ж
              </label>
            </div>
            <DateInput
              value={""}
              onChange={(val) => {
                console.log("Дата:", val);
              }}
            />
          </div>

          <div className={classes["passenger-form__limitation"]}>
            <label>
              <input type="checkbox" />
              ограниченная подвижность
            </label>
          </div>

          <div className={classes["passenger-form__passport"]}>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="passport">Паспорт РФ</option>
              <option value="birth">Свидетельство о рождении</option>
            </select>

            {docType === "passport" ? (
              <>
                <input type="text" placeholder="Серия" maxLength={4} />
                <input type="text" placeholder="Номер" maxLength={6} />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Пример: VIII-ВП-123456"
                  value={birthCertNumber}
                  onChange={handleBirthCertChange}
                />
                {birthCertError && (
                  <div className={classes["passenger-form__error"]}>
                    {birthCertError}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
