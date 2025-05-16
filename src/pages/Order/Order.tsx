import { Banner } from "../../components/Banner/Banner";
import { Filter } from "../../components/Filter/Filter";
import { LastTicketList } from "../../components/LastTicketList/LastTicketList";
import { Seats } from "../../components/Seats/Seats";
import { RouteList } from "../../components/RouteList/RouteList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";

import classes from "./order.module.css";

export const Order = () => {
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  const isSelectedTicketValid =
    selectedTicket?.departure?._id !== "" &&
    selectedTicket?.arrival?._id !== "";

  return (
    <div className={classes["order"]}>
      <Banner img="img/order-banner.png" direction={true} extraClasses={true} />
      <Suspense fallback={<Loader />}>
        <OrderNav activeStep={1} />
        <div className={classes["order__container"]}>
          <section className={classes["order__section"]}>
            <Filter />
            <LastTicketList />
          </section>
          <div className={classes["order__content"]}>
            {isSelectedTicketValid ? <Seats /> : <RouteList />}
          </div>
        </div>
      </Suspense>
    </div>
  );
};
