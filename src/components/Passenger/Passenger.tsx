import { useEffect, useState } from "react";
import MinusIcon from "../../assets/icons/pas-minus.svg?react";
import PlusIcon from "../../assets/icons/pas-plus.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import SelectIcon from "../../assets/icons/select-arrow.svg?react";
import { DateInput } from "../DateInput/DateInput";
import { SelectComponent } from "../Select/SelectComponent";
import classes from "./passenger.module.css";
type PassengerProps = {
  index: number;
  onRemove: () => void;
};

export const Passenger = ({ index = 1, onRemove }: PassengerProps) => {
  const [docType, setDocType] = useState("passport");
  const [passengerType, setPassengerType] = useState("adult");

  const [birthCertNumber, setBirthCertNumber] = useState("");
  const [birthCertError, setBirthCertError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const passengerTypeOptions = [
    { value: "adult", label: "Взрослый" },
    { value: "child", label: "Детский" },
  ];

  const docTypeOptions = [
    { value: "passport", label: "Паспорт РФ" },
    { value: "birth", label: "Свидетельство о рождении" },
  ];

  useEffect(() => {
    if (passengerType === "child") {
      setDocType("birth");
    }
  }, [passengerType]);

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
            <SelectComponent
              value={passengerType}
              onChange={setPassengerType}
              options={passengerTypeOptions}
            />
            <SelectIcon className={classes["passenger-form__select-icon" ]} />
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

          <div className={classes["passenger-form__docs"]}>
            <div className={classes["passenger-form__select"]}>
              <SelectComponent
                value={docType}
                onChange={setDocType}
                options={docTypeOptions}
              />
               <SelectIcon className={classes["passenger-form__select-icon" ]}/>
            </div>

            {docType === "passport" ? (
              <div className={classes["passenger-form__passport-input"]}>
                <input
                  type="text"
                  placeholder="Серия"
                  maxLength={4}
                  className={classes["passenger-form-input"]}
                />
                <input
                  type="text"
                  placeholder="Номер"
                  maxLength={6}
                  className={classes["passenger-form-input"]}
                />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Пример: VIII-ВП-123456"
                  value={birthCertNumber}
                  onChange={handleBirthCertChange}
                  className={classes["passenger-form-input"]}
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
