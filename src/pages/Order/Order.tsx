import { Banner } from "../../components/Banner/Banner";
import { Filter } from "../../components/Filter/Filter";
import { LastTicketList } from "../../components/LastTicketList/LastTicketList";
import { Passenger } from "../../components/Passenger/Passenger";
import { RouteList } from "../../components/RouteList/RouteList";
import classes from "./order.module.css";

export const Order = () => {
  return (
    <div className={classes["order"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <div className={classes["order__container"]}>
        <section className={classes["order__section"]}>
          <Filter/>
        <LastTicketList/>
        </section>
        <div className={classes["order__content"]}>
          {/* <RouteList /> */}
          <Passenger/>
        </div>
      </div>
    </div>
  );
};
