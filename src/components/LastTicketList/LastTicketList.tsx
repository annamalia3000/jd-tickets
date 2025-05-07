import { LastTicketItem } from "../LastTicketItem/LastTicketItem";
import { RouteProps } from "../../types/types";
import { useEffect, useState } from "react";
import classes from "./lastTicketList.module.css";

export const LastTicketList = () => {
  const [items, setItems] = useState<RouteProps[]>([]);
  const url = import.meta.env.VITE_HOST;
  const apiUrl = `${url}/routes/last`;

  const fetchRoutes = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItems(data);
      console.log("data", data);
    } catch (error) {
      console.error("Ошибка запроса последних направлений :", error);
    }
  };
  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className={classes["ticketlist"]}>
      <h3 className={classes["ticketlist__title"]}>последние билеты</h3>
      <div className={classes["ticketlist__list"]}>
        {items.map((item) => (
          <LastTicketItem key={item.departure._id} route={item} />
        ))}
      </div>
    </div>
  );
};
