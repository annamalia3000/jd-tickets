import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Details } from "../../components/Details/Details";
import { RouteItem } from "../../components/RouteItem/RouteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import cn from "classnames";
import classes from "./check.module.css";
import { CheckPassenger } from "../../components/CheckPassenger/CheckPassenger";

export const Check = () => {
  const selectedTicket = useSelector((state: RootState) => state.selectedTicket);
  const order = useSelector((state: RootState) => state.order);

  return (
    <div className={classes["check"]}>
      <Banner img="img/order-banner.png" extraClasses={true} />
      <OrderNav activeStep={4} />
      <div className={classes["check__container"]}>
        <section className={classes["check__section"]}>
          <Details />
        </section>
        <div className={classes["check__content"]}>
          {/* Поезд */}
          <div className={classes["check__content__section"]}>
            <div className={classes["check__content__section-header"]}>
              <h4 className={classes["check__content__section-header-title"]}>Поезд</h4>
            </div>
            <RouteItem
              route={selectedTicket}
              buttonText="Изменить"
              onButtonClick={() => {
                console.log("Изменить");
              }}
            />
          </div>

          <div className={classes["check__content__section"]}>
            <div className={classes["check__content__section-header"]}>
              <h4 className={classes["check__content__section-header-title"]}>Пассажиры</h4>
            </div>
            <div className={classes["check__content__section-pasassengers"]}>
              {order?.departure?.seats.map((seat, index) => (
                <CheckPassenger key={index} seat={seat} />
              ))}
              <button className={cn(classes["check__content-button"], "shadow-button")}>
                Изменить
              </button>
            </div>
          </div>


          <div className={classes["check__content__section"]}>
            <div className={classes["check__content__section-header"]}>
              <h4 className={classes["check__content__section-header-title"]}>Способ оплаты</h4>
            </div>
            <div className={classes["check__content__section-content"]}>
              <span className={classes["check__content__section-content-title"]}>
                {order.user?.payment_method === "online" ? "Онлайн" : "Наличными"}
              </span>
              <button className={cn(classes["check__content-button"], "shadow-button")}>
                Изменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
