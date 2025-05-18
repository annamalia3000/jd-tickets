import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import MinusIcon from "../../assets/icons/pas-minus.svg?react";
import PlusIcon from "../../assets/icons/pas-plus.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import SelectIcon from "../../assets/icons/select-arrow.svg?react";
import ErrorIcon from "../../assets/icons/error.svg?react";
import { BirthInput } from "../BirthInput/BirthInput";
import { SelectComponent } from "../Select/SelectComponent";
import cn from "classnames";
import classes from "./passengerItem.module.css";

type Data = {
  coach_id: string;
  person_info: PersonInfo;
  seat_number: number;
  is_child: boolean;
  include_children_seat: boolean;
};

type PersonInfo = {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: string;
  document_data: string;
};

type PassengerProps = {
  index: number;
  onRemove: () => void;
  initialType: "adult" | "child";
  onValidationChange: (isValid: boolean) => void;
  onDataReady: (data: Data) => void;
};

export const PassengerItem = ({
  index,
  onRemove,
  initialType,
  onValidationChange,
  onDataReady,
}: PassengerProps) => {
  const [docType, setDocType] = useState("passport");
  const [passengerType, setPassengerType] = useState<"adult" | "child">(
    initialType
  );
  const seats = useSelector(
    (state: RootState) => state.seats
  );

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "">("M");
  const [birthDate, setBirthDate] = useState("");

  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportError, setPassportError] = useState("");

  const [birthCertNumber, setBirthCertNumber] = useState("");
  const [birthCertError, setBirthCertError] = useState("");

  const [formError, setFormError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const validatePassport = (series: string, number: string) => {
    const seriesValid = /^\d{4}$/.test(series);
    const numberValid = /^\d{6}$/.test(number);

    if (!seriesValid || !numberValid) {
      setPassportError("Серия должна содержать 4 цифры, номер — 6 цифр");
      return false;
    } else {
      setPassportError("");
      return true;
    }
  };

  const validateBirthCert = (value: string) => {
    const regex = /^[IVXLCDM]{1,4}-[А-Я]{2}-\d{6}$/;
    if (!regex.test(value)) {
      setBirthCertError(
        "Номер свидетельства о рождении указан некорректно. Пример: VIII-ВП-123456"
      );
      return false;
    } else {
      setBirthCertError("");
      return true;
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!lastName || !firstName || !middleName) {
      setFormError("Пожалуйста, заполните ФИО");
      isValid = false;
    } else if (!birthDate) {
      setFormError("Пожалуйста, укажите дату рождения");
      isValid = false;
    } else {
      setFormError("");
    }

    if (docType === "passport") {
      const docValid = validatePassport(passportSeries, passportNumber);
      isValid = isValid && docValid;
    } else {
      const docValid = validateBirthCert(birthCertNumber);
      isValid = isValid && docValid;
    }

    onValidationChange(isValid);

    if (isValid) {
      const data = {
        coach_id: seats.departure[0].coach._id, //заглушка
        seat_number: 10, //заглушка
        is_child: passengerType === "child",
        include_children_seat: passengerType === "child",
        person_info: {
          is_adult: passengerType === "adult",
          first_name: firstName,
          last_name: lastName,
          patronymic: middleName,
          gender: gender === "M",
          birthday: birthDate,
          document_type:
            docType === "passport" ? "паспорт" : "свидетельство о рождении",
          document_data:
            docType === "passport"
              ? `${passportSeries} ${passportNumber}`
              : birthCertNumber,
        },
      };
      onDataReady(data);
    }
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassportSeries(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassportNumber(e.target.value);
  };

  const handleBirthCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthCertNumber(e.target.value.toUpperCase());
  };

  const handlePassengerTypeChange = (value: string) => {
    if (value === "adult" || value === "child") {
      setPassengerType(value);
    }
  };

  return (
    <form className={classes["passenger-form"]}>
      <div className={classes["passenger-form__header"]}>
        <h4 className={classes["passenger-form__header-title"]}>
          <button
            type="button"
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
        <div className={classes["passenger-form__info-container"]}>
          <div className={classes["passenger-form__info"]}>
            <div className={classes["passenger-form__select"]}>
              <SelectComponent
                value={passengerType}
                onChange={handlePassengerTypeChange}
                options={passengerTypeOptions}
              />
              <SelectIcon className={classes["passenger-form__select-icon"]} />
            </div>

            <div className={classes["passenger-form__name"]}>
              <label className={classes["passenger-form-label"]}>
                <span>Фамилия</span>
                <input
                  type="text"
                  placeholder="Фамилия"
                  className={classes["passenger-form-input"]}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className={classes["passenger-form-label"]}>
                <span>Имя</span>
                <input
                  type="text"
                  placeholder="Имя"
                  className={classes["passenger-form-input"]}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className={classes["passenger-form-label"]}>
                <span>Отчество</span>
                <input
                  type="text"
                  placeholder="Отчество"
                  className={classes["passenger-form-input"]}
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </label>
            </div>

            <div className={classes["passenger-form__sex-age"]}>
              <div className={classes["passenger-form__sex"]}>
                <span className={classes["passenger-form-label"]}>Пол</span>
                <div className={classes["gender-buttons"]}>
                  <input
                    type="radio"
                    id={`male-${index}`}
                    name={`gender-${index}`}
                    value="M"
                    className={classes["gender-radio"]}
                    checked={gender === "M"}
                    onChange={() => setGender("M")}
                  />
                  <label
                    htmlFor={`male-${index}`}
                    className={classes["gender-label"]}
                  >
                    М
                  </label>
                  <input
                    type="radio"
                    id={`female-${index}`}
                    name={`gender-${index}`}
                    value="F"
                    className={classes["gender-radio"]}
                    checked={gender === "F"}
                    onChange={() => setGender("F")}
                  />
                  <label
                    htmlFor={`female-${index}`}
                    className={classes["gender-label"]}
                  >
                    Ж
                  </label>
                </div>
              </div>

              <div className={classes["passenger-form-age"]}>
                <label className={classes["passenger-form-label"]}>
                  <span>Дата рождения</span>
                  <BirthInput
                    value={birthDate}
                    onChange={(val) => setBirthDate(val)}
                  />
                </label>
              </div>
            </div>

            <div className={classes["passenger-form__limitation"]}>
              <label>
                <input type="checkbox" />
                ограниченная подвижность
              </label>
            </div>
          </div>

          <div className={classes["passenger-form__docs-container"]}>
            <div className={classes["passenger-form__docs"]}>
              <div className={classes["passenger-form__select"]}>
                <SelectComponent
                  value={docType}
                  onChange={setDocType}
                  options={docTypeOptions}
                />
                <SelectIcon
                  className={classes["passenger-form__select-icon"]}
                />
              </div>

              {docType === "passport" ? (
                <div className={classes["passenger-form__passport-input"]}>
                  <input
                    type="text"
                    placeholder="  __ __ __ __"
                    minLength={4}
                    maxLength={4}
                    value={passportSeries}
                    onChange={handleSeriesChange}
                    className={classes["passenger-form-input"]}
                  />
                  <input
                    type="text"
                    placeholder="  __ __ __ __ __ __"
                    minLength={6}
                    maxLength={6}
                    value={passportNumber}
                    onChange={handleNumberChange}
                    className={classes["passenger-form-input"]}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Пример: VIII-ВП-123456"
                  value={birthCertNumber}
                  onChange={handleBirthCertChange}
                  className={classes["passenger-form-input"]}
                />
              )}
            </div>
          </div>

          {(passportError || birthCertError || formError) && (
            <div className={classes["passenger-form__error"]}>
              <ErrorIcon className={classes["passenger-form__error-icon"]} />
              {formError || passportError || birthCertError}
            </div>
          )}

          <div className={classes["passenger-form-button-container"]}>
            <button
              type="button"
              onClick={handleSubmit}
              className={cn(classes["passenger-form-button"], "shadow-button")}
            >
              Следующий пассажир
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
