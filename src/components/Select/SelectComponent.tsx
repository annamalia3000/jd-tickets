import Select, { StylesConfig, SingleValue, GroupBase } from "react-select";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

const selectStyles: StylesConfig<Option, false> = {
  control: (base) => ({
    ...base,
    width: "100%",
    border: "none",
    background: "transparent",
    boxShadow: "none",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "#f9f6fa",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    marginTop: "-40px",
    borderRadius: 0,
    position: "absolute",
    left: "5px",
  }),
  option: (base, state) => ({
    ...base,
    padding: "12px 16px",
    fontSize: "16px",
    color: state.isFocused || state.isSelected ? "#ffffff" : "#2c2c2c",
    backgroundColor:
      state.isFocused || state.isSelected ? "rgba(255, 202, 98, 1)" : "#f9f6fa",
    borderBottom: "1px solid rgba(229, 229, 229, 1)",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "100%",
    color: "#2c2c2c",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export const SelectComponent = ({ value, onChange, options }: SelectProps) => {
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <Select<Option, false, GroupBase<Option>>
      styles={selectStyles}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
    />
  );
};
