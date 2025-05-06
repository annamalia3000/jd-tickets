import { Banner } from "../../components/Banner/Banner";
import { RouteList } from "../../components/RouteList/RouteList";
import classes from "./order.module.css";

export const Order = () => {
  return (
    <div className={classes["order"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <div className={classes["order__container"]}>
        <section className={classes["order__section"]}>боковая секция</section>
        <div className={classes["order__content"]}>
          <RouteList />
        </div>
      </div>
    </div>
  );
};
