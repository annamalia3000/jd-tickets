import { useMemo } from "react";

type PriceInfoSection = {
  top_price?: number;
};

type Departure = {
  price_info?: Record<string, PriceInfoSection>;
};

type Item = {
  min_price?: number;
  departure: Departure;
};

export const usePrice = (
  forwardItems: Item[] = [],
  backwardItems: Item[] = []
): [number, number] => {
  return useMemo(() => {
    const allItems = [...(forwardItems || []), ...(backwardItems || [])];

    if (!allItems.length) return [0, Infinity];

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    for (const item of allItems) {
      if (typeof item.min_price === "number") {
        minPrice = Math.min(minPrice, item.min_price);
      }

      const topPrices = Object.values(item.departure.price_info || {})
        .map((section) => section?.top_price)
        .filter((p): p is number => typeof p === "number");

      if (topPrices.length) {
        maxPrice = Math.max(maxPrice, ...topPrices);
      }
    }

    return [
      minPrice === Infinity ? 0 : minPrice,
      maxPrice === -Infinity ? 0 : maxPrice,
    ];
  }, [forwardItems, backwardItems]);
};
