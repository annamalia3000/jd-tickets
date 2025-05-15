import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Details } from "../../components/Details/Details";
import { RouteItem } from "../../components/RouteItem/RouteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import RubIcon from "../../assets/icons/rub.svg?react";
import { CheckPassenger } from "../../components/CheckPassenger/CheckPassenger";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import classes from "./check.module.css";

export const Check = () => {
  const navigate = useNavigate();
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  const order = useSelector((state: RootState) => state.order);

  const handleSubmit = () => {
    navigate("/success");
  };

  return (
    <div className={classes["check"]}>
      <Banner img="img/order-banner.png" direction={true} extraClasses={true} />
      <OrderNav activeStep={4} />
      <div className={classes["check__container"]}>
        <section className={classes["check__section"]}>
          <Details />
        </section>
        <div className={classes["check__content"]}>
          <div className={classes["check__content__section"]}>
            <div className={classes["check__content__section-header"]}>
              <h4 className={classes["check__content__section-header-title"]}>
                Поезд
              </h4>
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
              <h4 className={classes["check__content__section-header-title"]}>
                Пассажиры
              </h4>
            </div>
            <div className={classes["check__content__section-container"]}>
              <div className={classes["check__content__section-pasassengers"]}>
                {order?.departure?.seats.map((seat, index) => (
                  <CheckPassenger key={index} seat={seat} />
                ))}
              </div>
              <div className={classes["check__content__section-total"]}>
                <div className={classes["check__content__section-total-text"]}>
                  <span>Всего</span>
                  <div
                    className={classes["check__content__section-total-price"]}
                  >
                    <span
                      className={
                        classes["check__content__section-total-price-text"]
                      }
                    >
                      {selectedTicket?.totalPrice}
                    </span>
                    <span className={classes["check-rub-icon"]}>
                      <RubIcon />
                    </span>
                  </div>
                </div>

                <button
                  className={cn(
                    classes["check__content-button"],
                    "shadow-button"
                  )}
                >
                  Изменить
                </button>
              </div>
            </div>
          </div>

          <div className={classes["check__content__section"]}>
            <div className={classes["check__content__section-header"]}>
              <h4 className={classes["check__content__section-header-title"]}>
                Способ оплаты
              </h4>
            </div>
            <div className={classes["check__content__section-content"]}>
              <span
                className={classes["check__content__section-content-title"]}
              >
                {order.user?.payment_method === "online"
                  ? "Онлайн"
                  : "Наличными"}
              </span>
              <button
                className={cn(
                  classes["check__content-button"],
                  "shadow-button"
                )}
              >
                Изменить
              </button>
            </div>
          </div>
          <div className={classes["check__content__button-container"]}>
            <button
              className={cn(classes["check-button"], "shadow-button")}
              onClick={handleSubmit}
            >
              КУПИТЬ БИЛЕТЫ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
