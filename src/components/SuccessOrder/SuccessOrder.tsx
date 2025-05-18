import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/state/store";
import InstructionIcon1 from "../../assets/icons/instruction1.svg?react";
import InstructionIcon2 from "../../assets/icons/instruction2.svg?react";
import InstructionIcon3 from "../../assets/icons/instruction3.svg?react";
import RubIcon from "../../assets/icons/rub.svg?react";
import StarIcon from "../../assets/icons/star.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSelectedTicket } from "../../redux/slicers/selectedTicketSlice";
import { clearSeats } from "../../redux/slicers/seatsSlice";
import { clearRoute } from "../../redux/slicers/routesSlice";
import { clearOrder } from "../../redux/slicers/orderSlice";
import classes from "./successOrder.module.css";

export const SuccessOrder = () => {
  const dispatch = useDispatch();
  const selectedTicket = useSelector(
    (state: RootState) => state.selectedTicket
  );

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const order = useSelector((state: RootState) => state.order);

  const totalPrice = selectedTicket?.backward 
    ? ((selectedTicket?.forward?.totalPrice || 0) + (selectedTicket?.backward?.totalPrice || 0)) 
    : selectedTicket?.forward?.totalPrice;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    dispatch(clearSelectedTicket());
    dispatch(clearSeats());
    dispatch(clearRoute());
    dispatch(clearOrder());
    localStorage.clear();
    //отправка рейтинга
  };
  return (
    <div className={classes["success-order__container"]}>
      <div className={classes["success-order__header"]}>
        <span>№Заказа 285АА</span>
        <div className={classes["success-order__header-price"]}>
          <span className={classes["success-order__header-text"]}>сумма</span>
          <span>{totalPrice}</span>
          <span className={classes["success-order__header-text"]}>
            <RubIcon className={classes["success-order__header-icon"]} />
          </span>
        </div>
      </div>
      <div className={classes["success-order__instructions"]}>
        <div className={classes["success-order__instructions__item"]}>
          <InstructionIcon1 />
          <p className={classes["success-order__instructions__item-text"]}>
            билеты будут отправлены на ваш{" "}
            <span
              className={classes["success-order__instructions__item-text-bold"]}
            >
              e-mail
            </span>
          </p>
        </div>
        <div className={classes["success-order__instructions__item"]}>
          <InstructionIcon2 />
          <p className={classes["success-order__instructions__item-text"]}>
            <span
              className={classes["success-order__instructions__item-text-bold"]}
            >
              распечатайте{" "}
            </span>
            и сохраняйте билеты до даты поездки
          </p>
        </div>
        <div className={classes["success-order__instructions__item"]}>
          <InstructionIcon3 />
          <p className={classes["success-order__instructions__item-text"]}>
            <span
              className={classes["success-order__instructions__item-text-bold"]}
            >
              предьявите{" "}
            </span>
            распечатанные билеты при посадке
          </p>
        </div>
      </div>
      <div className={classes["success-order__info"]}>
        <div className={classes["success-order__info-name"]}>
          {order?.user?.first_name} {order?.user?.patronymic}!
        </div>
        <div className={classes["success-order__info-text"]}>
          <p>Ваш заказ успешно оформлен.</p>
          <p>
            В ближайшее время с вами свяжется наш оператор для подтверждения.
          </p>
        </div>
        <div className={classes["success-order__info-text-bold"]}>
          Благодарим Вас за оказанное доверие и желаем приятного путешествия!
        </div>
      </div>
      <div className={classes["success-order__options"]}>
        <div className={classes["success-order__options-rate"]}>
          <span>Оценить сервис</span>
          <div className={classes["success-order__options-rate-stars"]}>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const starIndex = index + 1;
                const isActive =
                  hovered !== null ? starIndex <= hovered : starIndex <= rating;

                return (
                  <StarIcon
                    key={index}
                    className={`${classes["success-order__star"]} ${
                      isActive ? classes["success-order__star--active"] : ""
                    }`}
                    onClick={() => setRating(starIndex)}
                    onMouseEnter={() => setHovered(starIndex)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
          </div>
        </div>

        <button
          onClick={handleClick}
          className={classes["success-order__options-button"]}
        >
          вернуться на главную
        </button>
      </div>
    </div>
  );
};