import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setPriceRange } from "../../../redux/slicers/routesSlice";
import { RootState } from "../../../redux/state/store";
import { usePrice } from "../../../hooks/usePrice";
import { Range } from "react-range";
import classes from "./priceSlider.module.css";

export const PriceSlider = () => {
  const dispatch = useDispatch();
  const { forwardRoutes, backwardRoutes, filters, priceRange } = useSelector(
    (state: RootState) => state.routes
  );

  const allRoutes = useMemo(() => [...forwardRoutes, ...backwardRoutes], [forwardRoutes, backwardRoutes]);

  const [minPrice, maxPrice] = usePrice(allRoutes);

  const [values, setValues] = useState<[number, number]>([
    priceRange[0] ?? minPrice, 
    priceRange[1] ?? maxPrice,
  ]);

  useEffect(() => {
    if (allRoutes.length > 0 && minPrice !== Infinity && maxPrice !== Infinity) {

      if (minPrice !== priceRange[0] || maxPrice !== priceRange[1]) {
        dispatch(setPriceRange([minPrice, maxPrice]));
      }

      const newValues: [number, number] = [
        Math.max(minPrice, priceRange[0] ?? minPrice),
        Math.min(maxPrice, priceRange[1] ?? maxPrice),
      ];


      if (newValues[0] !== values[0] || newValues[1] !== values[1]) {
        setValues(newValues);
      }
    }
  }, [allRoutes, minPrice, maxPrice, priceRange, dispatch]); 

  const handleChange = (newValues: number[]) => {
    setValues([newValues[0], newValues[1]]);
  };

  const handleChangeCommitted = () => {
    if (values) {
      dispatch(
        setFilters({
          ...filters,
          minPrice: values[0],
          maxPrice: values[1],
        })
      );
    }
  };

  const isPricesReady =
    minPrice !== Infinity &&
    maxPrice !== Infinity &&
    values !== null &&
    values[0] >= minPrice &&
    values[1] <= maxPrice;

  return isPricesReady ? (
    <div className={classes["slider-container"]}>
      <div className={classes["slider-text"]}>
        <span>от</span>
        <span>до</span>
      </div>

      <div className={classes["price-slider-container"]}>
        <Range
          values={values}
          step={1}
          min={minPrice}
          max={maxPrice}
          onChange={handleChange}
          onFinalChange={handleChangeCommitted}
          renderTrack={({ props, children }) => {
            const percentage1 =
              ((values[0] - minPrice) / (maxPrice - minPrice)) * 100;
            const percentage2 =
              ((values[1] - minPrice) / (maxPrice - minPrice)) * 100;

            return (
              <div {...props} className={classes.track}>
                <div
                  className={classes["track-fill"]}
                  style={{
                    left: `${percentage1}%`,
                    width: `${percentage2 - percentage1}%`,
                  }}
                />
                {children}
              </div>
            );
          }}
          renderThumb={({ index, props }) => {
            const { key, ...rest } = props;
            return (
              <div key={key} {...rest} className={classes.thumb}>
                {values[index] !== minPrice && values[index] !== maxPrice && (
                  <div className={classes["thumb-value"]}>{values[index]}</div>
                )}
              </div>
            );
          }}
        />
        <div className={classes["slider-text"]}>
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>
      </div>
    </div>
  ) : null;
};
