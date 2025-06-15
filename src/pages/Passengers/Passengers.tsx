import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { PassengersList } from "../../components/PassengersList/PassengersList";
import { Details } from "../../components/Details/Details";
import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";

import classes from "./passengers.module.css";

export const Passengers = () => {
  return (
    <div className={classes["passengers"]}>
      <Banner img="/img/order-banner.png" direction={true} extraClasses={true} />
      <Suspense fallback={<Loader />}>
        <OrderNav activeStep={2} />
        <div className={classes["passengers__container"]}>
          <section className={classes["passengers__section"]}>
            <Details />
          </section>
          <div className={classes["passengers__content"]}>
            {<PassengersList />}
          </div>
        </div>
      </Suspense>
    </div>
  );
};
