import { Banner } from "../../components/Banner/Banner";
import { Filter } from "../../components/Filter/Filter";
import { LastTicketList } from "../../components/LastTicketList/LastTicketList";
import { Seats } from "../../components/Seats/Seats";
import { RouteList } from "../../components/RouteList/RouteList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import classes from "./order.module.css";

export const Order = () => {
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  return (
    <div className={classes["order"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <div className={classes["order__container"]}>
        <section className={classes["order__section"]}>
          <Filter />
          <LastTicketList />
        </section>
        <div className={classes["order__content"]}>
          {selectedTicket ? <Seats /> : <RouteList />}
        </div>
      </div>
    </div>
  );
};
