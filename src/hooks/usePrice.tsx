import { useMemo } from "react";

type PriceInfoSection = {
  top_price?: number;
};

type Departure = {
  price_info: Record<string, PriceInfoSection>;
};

type Item = {
  min_price: number;
  departure: Departure;
};

export const usePrice = (items: Item[]): [number, number] => {
  return useMemo(() => {
    if (!items.length) return [0, Infinity];

    let minPrice = Infinity;
    let maxTopPrice = -Infinity;

    for (const item of items) {
      if (typeof item.min_price === "number") {
        minPrice = Math.min(minPrice, item.min_price);
      }

      const topPrices = Object.values(item.departure.price_info || {})
        .map((section) => section.top_price)
        .filter((p): p is number => typeof p === "number");

      if (topPrices.length) {
        const itemMaxTop = Math.max(...topPrices);
        maxTopPrice = Math.max(maxTopPrice, itemMaxTop);
      }
    }

    return [
      minPrice === Infinity ? 0 : minPrice,
      maxTopPrice === -Infinity ? 0 : maxTopPrice,
    ];
  }, [items]);
};
