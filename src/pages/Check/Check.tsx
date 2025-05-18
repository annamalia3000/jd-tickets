import { useState } from "react";
import { Banner } from "../../components/Banner/Banner";
import { OrderNav } from "../../components/OrderNav/OrderNav";
import { Details } from "../../components/Details/Details";
import { RouteItem } from "../../components/RouteItem/RouteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import RubIcon from "../../assets/icons/rub.svg?react";
import { CheckPassenger } from "../../components/CheckPassenger/CheckPassenger";
import { useNavigate } from "react-router-dom";
import { PopUp } from "../../components/PopUp/PopUp";
import { Suspense } from "react";
import { Loader } from "../../components/Loader/Loader";
import cn from "classnames";
import classes from "./check.module.css";
import { RouteCombined } from "../../components/RouteCombined/RouteCombined";

export const Check = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );
  const order = useSelector((state: RootState) => state.order);

  const url = import.meta.env.VITE_HOST;
  const apiUrl = `${url}/order`;

  const handleSubmit = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            first_name: order.user?.first_name,
            last_name: order.user?.last_name,
            patronymic: order.user?.patronymic,
            phone: order.user?.phone,
            email: order.user?.email,
            payment_method: order.user?.payment_method,
          },
          departure: {
            route_direction_id: order.departure?.route_direction_id,
            seats: order.departure?.seats.map((seat) => ({
              coach_id: seat.coach_id,
              seat_number: seat.seat_number,
              is_child: seat.is_child,
              include_children_seat: seat.include_children_seat,
              person_info: {
                is_adult: seat.person_info.is_adult,
                first_name: seat.person_info.first_name,
                last_name: seat.person_info.last_name,
                patronymic: seat.person_info.patronymic,
                gender: seat.person_info.gender,
                birthday: seat.person_info.birthday,
                document_type: seat.person_info.document_type,
                document_data: seat.person_info.document_data,
              },
            })),
          },

          ...(order.arrival ? {
            arrival: {
              route_direction_id: order.arrival?.route_direction_id,
              seats: order.arrival?.seats.map((seat) => ({
                coach_id: seat.coach_id,
                seat_number: seat.seat_number,
                is_child: seat.is_child,
                include_children_seat: seat.include_children_seat,
                person_info: {
                  is_adult: seat.person_info.is_adult,
                  first_name: seat.person_info.first_name,
                  last_name: seat.person_info.last_name,
                  patronymic: seat.person_info.patronymic,
                  gender: seat.person_info.gender,
                  birthday: seat.person_info.birthday,
                  document_type: seat.person_info.document_type,
                  document_data: seat.person_info.document_data,
                },
              })),
            }
          } : {}),
        }),
      });

      const data = await response.json();
      console.log("Успешный заказ:", data);
      navigate("/success");
    } catch (error) {      console.error("Ошибка при отправке заказа:", error);
      setError(true);
    }
  };

  return (
    <div className={classes["check"]}>
      {error && (
        <PopUp
          type="error"
          textFirst="Ошибка при отправке заказа"
          textSecond="Повторите попытку позже"
          onClose={() => {
            setError(false);
          }}
          isOpen={error}
        />
      )}
      <Banner img="img/order-banner.png" direction={true} extraClasses={true} />
      <Suspense fallback={<Loader />}>
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
             { selectedTicket.backward ? (
              <RouteCombined
                forwardRoute={selectedTicket.forward}
                backwardRoute={selectedTicket.backward}
                buttonText="Изменить"
                onButtonClick={() => {
                  console.log("Изменить");
                }}
              />
             ) : (
              <RouteItem
                route={selectedTicket.forward}
                buttonText="Изменить"
                onButtonClick={() => {
                  console.log("Изменить");
                }}
              />
             )}
            </div>

            <div className={classes["check__content__section"]}>
              <div className={classes["check__content__section-header"]}>
                <h4 className={classes["check__content__section-header-title"]}>
                  Пассажиры
                </h4>
              </div>
              <div className={classes["check__content__section-container"]}>
                <div
                  className={classes["check__content__section-pasassengers"]}
                >
                  {order?.departure?.seats.map((seat, index) => (
                    <CheckPassenger key={index} seat={seat} />
                  ))}
                </div>
                <div className={classes["check__content__section-total"]}>
                  <div
                    className={classes["check__content__section-total-text"]}
                  >
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
      </Suspense>
    </div>
  );
};