import { format, parse } from "date-fns";

export const formatDateToISO = (date: string) => {
  const parsedDate = parse(date, "dd.MM.yy", new Date());
  return format(parsedDate, "yyyy-MM-dd");
};
