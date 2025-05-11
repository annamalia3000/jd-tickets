import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Details } from "../../components/Details/Details";

import classes from "./payment.module.css";

export const Payment= () => {
  return (
    <div className={classes["payment"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <OrderNav activeStep={3} />
      <div className={classes["payment__container"]}>
        <section className={classes["payment__section"]}>
          <Details />
   
        </section>
        <div className={classes["payment__content"]}>
          оплата
        </div>
      </div>
    </div>
  );
};
