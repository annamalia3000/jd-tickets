import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import "react-day-picker/dist/style.css";
import classes from "./dateInput.module.css";

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

export const DateInput = ({ value, onChange, name = "" }: DateInputProps) => {
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

  return (
    <div className={classes["date__container"]}>
      <input
        type="text"
        name={name}
        ref={inputRef}
        value={value}
        autoComplete="off"
        onClick={() => setIsOpen((prev) => !prev)}
        onChange={(e) => onChange(e.target.value)}
        className={classes["date__input"]}
        placeholder="ДД/ММ/ГГ"
      />
      <CalendarIcon className={classes["date__input-icon"]} />
      {isOpen && (
        <div className={classes["date__picker"]} ref={pickerRef}>
          <DayPicker
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (date) {
                const formatted = format(date, "dd.MM.yy");
                onChange(formatted);
                setIsOpen(false);
              }
            }}
            locale={ru}
            formatters={{
              formatCaption: (date) =>
                date.toLocaleDateString("ru-RU", { month: "long" }),
            }}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
    </div>
  );
};