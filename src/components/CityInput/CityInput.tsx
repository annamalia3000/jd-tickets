import { useState, useEffect } from "react";
import LocationIcon from "../../assets/icons/location.svg?react";
import classes from "./cityInput.module.css";

type CityInputProps = {
  value: CityProps;
  onChange: (value: CityProps) => void;
  startPlaceholder?: string;
  name?: string;
};

type CityProps = {
  _id: string;
  name: string;
};

export const CityInput = ({
  value,
  onChange,
  startPlaceholder = "",
  name = "",
}: CityInputProps) => {
  const [inputText, setInputText] = useState(value.name);
  const [suggestions, setSuggestions] = useState<CityProps[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const url = import.meta.env.VITE_HOST;
  const apiURL = `${url}/routes/cities?name=${inputText} `;

  useEffect(() => {
    const fetchCities = async () => {
      if (!inputText.trim()) {
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
  }, [inputText]);

  const handleSelect = (city: CityProps) => {
    setInputText(city.name);
    onChange(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const matchedSuggestion = suggestions.find((city: CityProps) =>
    city.name.toLowerCase().startsWith(value.name.toLowerCase())
  );

  return (
    <div className={classes["city__input-container"]}>
      <div className={classes["city__ghost-text"]}>
        {value &&
        matchedSuggestion &&
        matchedSuggestion.name.toLowerCase().startsWith(value.name.toLowerCase()) ? (
          <>
            <span className={classes["city__ghost-transparent"]}>
              {matchedSuggestion.name.slice(0, value.name.length)}
            </span>
            <span className={classes["city__ghost-visible"]}>
              {matchedSuggestion.name.slice(value.name.length)}
            </span>
          </>
        ) : null}
      </div>

      <input
        type="text"
        name={name}
        placeholder={startPlaceholder}
        value={inputText}
        autoComplete="off"
        className={classes["city__input"]}
        onChange={(e) => {
          setInputText(e.target.value);
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
            handleSelect(matchedSuggestion);
          }
        }}
      />
      <LocationIcon className={classes["city__input-icon"]} />
      {suggestions.length > 0 && showSuggestions && (
        <div className={classes["city__suggestions"]}>
          <ul className={classes["city__list"]}>
          {suggestions.map((city: CityProps) => (
            <li
              key={city._id}
              onClick={() => handleSelect(city)}
              className={classes["city__item"]}
            >
              {city.name}
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};
