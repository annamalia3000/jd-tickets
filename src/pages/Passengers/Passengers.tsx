import { Banner } from "../../components/Banner/Banner";
import { Filter } from "../../components/Filter/Filter";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import { OrderNav } from "../../components/OrderNav/OrderNav";

import classes from "./passengers.module.css";
import { PassengerItem } from "../../components/PassengerItem/PassengerItem";

export const Passengers = () => {
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  return (
    <div className={classes["passengers"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <OrderNav activeStep={2} />
      <div className={classes["passengers__container"]}>
        <section className={classes["passengers__section"]}>
          <Filter />
   
        </section>
        <div className={classes["passengers__content"]}>
          {<PassengerItem index={1} onRemove={()=>{}} />}
        </div>
      </div>
    </div>
  );
};
