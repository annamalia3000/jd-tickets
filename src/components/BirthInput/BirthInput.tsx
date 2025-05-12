import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import "react-day-picker/dist/style.css";
import classes from "./birthInput.module.css";

type BirthInputProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

export const BirthInput = ({ value, onChange, name = "" }: BirthInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const parsedDate = value ? new Date(value) : undefined;

  return (
    <div className={classes["date__container"]}>
      <input
        type="text"
        name={name}
        ref={inputRef}
        value={parsedDate ? format(parsedDate, "dd.MM.yyyy") : ""}
        autoComplete="off"
        onClick={() => setIsOpen((prev) => !prev)}
        onChange={() => {}}
        className={classes["date__input"]}
        placeholder="ДД.ММ.ГГГГ"
        readOnly
      />
      <CalendarIcon className={classes["date__input-icon"]} />
      {isOpen && (
        <div className={classes["date__picker"]} ref={pickerRef}>
          <DayPicker
            mode="single"
            selected={parsedDate}
            onSelect={(date) => {
              if (date) {
                const isoFormatted = format(date, "yyyy-MM-dd");
                onChange(isoFormatted);
                setIsOpen(false);
              }
            }}
            locale={ru}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
          />
        </div>
      )}
    </div>
  );
};
