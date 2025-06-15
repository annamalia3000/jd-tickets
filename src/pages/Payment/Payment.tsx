import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Details } from "../../components/Details/Details";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";

import classes from "./payment.module.css";

export const Payment = () => {
  return (
    <div className={classes["payment"]}>
      <Banner img="/img/order-banner.png" direction={true} extraClasses={true} />
            <Suspense fallback={<Loader />}> <OrderNav activeStep={3} />
      <div className={classes["payment__container"]}>
        <section className={classes["payment__section"]}>
          <Details />
        </section>
        <div className={classes["payment__content"]}>
          <PaymentForm />
        </div>
      </div>
      </Suspense>
     
    </div>
  );
};
