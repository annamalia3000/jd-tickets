import { useMemo } from "react";

type UseTimeResult = {
  hours: number;
  minutes: number;
  formatted: string;       // 01:05
  localized?: string;      // 14:36\n16.01.2024
};

export const useTime = (seconds: number, options?: { type?: "duration" | "datetime" }): UseTimeResult => {
  return useMemo(() => {
    if (options?.type === "datetime") {
      const date = new Date(seconds * 1000); // преобразуем секунды в миллисекунды
      const localized = date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Разделяем дату и время
      const [datePart, timePart] = localized.split(", ");

      // Формируем строку, где сначала время, потом дата
      const formattedLocalized = `${timePart}\n${datePart}`;

      return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        formatted: timePart, // время в формате "14:36"
        localized: formattedLocalized, // дата и время в формате "14:36\n16.01.2024"
      };
    }

    // Default: duration
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return {
      hours,
      minutes,
      formatted,
    };
  }, [seconds, options?.type]);
};
