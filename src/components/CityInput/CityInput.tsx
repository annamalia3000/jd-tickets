import { useState, useEffect } from "react";
import LocationIcon from "../../assets/icons/location.svg?react";
import classes from "./cityInput.module.css";

type CityInputProps = {
  value: string;
  onChange: (value: string) => void;
  startPlaceholder?: string;
  name?: string;
};

type CityProps = {
  _id: "string";
  name: "string";
};

export const CityInput = ({
  value,
  onChange,
  startPlaceholder = "",
  name = "",
}: CityInputProps) => {
  const [suggestions, setSuggestions] = useState<CityProps[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const url = import.meta.env.VITE_HOST;
  const apiURL = `${url}/routes/cities?name=${value} `;

  useEffect(() => {
    const fetchCities = async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.log("Ошибка загрузки городов", error);
      }
    };
    const timeout = setTimeout(fetchCities, 1 * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const matchedSuggestion = suggestions.find((city: CityProps) =>
    city.name.toLowerCase().startsWith(value.toLowerCase())
  );

  return (
    <div className={classes["city__input-container"]}>
      <div className={classes["city__ghost-text"]}>
        {value &&
        matchedSuggestion &&
        matchedSuggestion.name.toLowerCase().startsWith(value.toLowerCase()) ? (
          <>
            <span className={classes["city__ghost-transparent"]}>
              {matchedSuggestion.name.slice(0, value.length)}
            </span>
            <span className={classes["city__ghost-visible"]}>
              {matchedSuggestion.name.slice(value.length)}
            </span>
          </>
        ) : null}
      </div>

      <input
        type="text"
        name={name}
        placeholder={startPlaceholder}
        value={value}
        autoComplete="off"
        className={classes["city__input"]}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => {
            setShowSuggestions(false);
          }, 200);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && matchedSuggestion) {
            e.preventDefault();
            handleSelect(matchedSuggestion.name);
          }
        }}
      />
      <LocationIcon className={classes["city__input-icon"]} />
      {suggestions.length > 0 && showSuggestions && (
        <ul className={classes["city__list"]}>
          {suggestions.map((city: CityProps) => (
            <li
              key={city._id}
              onClick={() => handleSelect(city.name)}
              className={classes["city__item"]}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
