import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/orderSlice";
import ErrorIcon from "../../assets/icons/error.svg?react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import classes from "./paymentForm.module.css";

type Data = {
  last_name: string;
  first_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: "cash" | "online";
};

export const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(
    null
  );

  const [formError, setFormError] = useState("");

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const editPhone = phone.replace(/^\+7/, "8")

  const handleSubmit = () => {
    let isValid = true;

    if (!lastName || !firstName || !middleName) {
      setFormError("Пожалуйста, заполните ФИО");
      isValid = false;
    } else if (!validatePhone(phone)) {
      setFormError("Неверный формат номера телефона");
      isValid = false;
    } else if (!validateEmail(email)) {
      setFormError("Неверный формат email");
      isValid = false;
    } else if (!paymentMethod) {
      setFormError("Пожалуйста, выберите способ оплаты");
      isValid = false;
    } else {
      setFormError("");
    }

    if (isValid && paymentMethod) {
      const data: Data = {
        first_name: firstName,
        last_name: lastName,
        patronymic: middleName,
        phone: editPhone,
        email,
        payment_method: paymentMethod,
      };
      dispatch(setUser(data));
      navigate("/check");
    }
  };

  return (
    <div className={classes["payment-form-container"]}>
      <form
        className={classes["payment-form"]}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={classes["payment-form__header"]}>
          <h4 className={classes["payment-form__header-title"]}>
            Персональные данные
          </h4>
        </div>
        <div className={classes["payment-form__info"]}>
          <div className={classes["payment-form__section"]}>
            <label className={classes["payment-form-label"]}>
              <span>Фамилия</span>
              <input
                type="text"
                placeholder="Фамилия"
                className={classes["payment-form-input"]}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className={classes["payment-form-label"]}>
              <span>Имя</span>
              <input
                type="text"
                placeholder="Имя"
                className={classes["payment-form-input"]}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className={classes["payment-form-label"]}>
              <span>Отчество</span>
              <input
                type="text"
                placeholder="Отчество"
                className={classes["payment-form-input"]}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </label>
          </div>
          <div className={classes["payment-form__section"]}>
            <label className={classes["payment-form-label"]}>
              <span>Контактный телефон</span>
              <input
                type="text"
                placeholder="+7 ___ ___ __ __"
                className={classes["payment-form-input"]}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <div className={classes["payment-form__section"]}>
            <label className={classes["payment-form-label"]}>
              <span>E-mail</span>
              <input
                type="email"
                placeholder="inbox@gmail.ru"
                className={classes["payment-form-input"]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className={classes["payment-form__header"]}>
          <h4 className={classes["payment-form__header-title"]}>
            Способ оплаты
          </h4>
        </div>
        <div className={classes["payment-form__info"]}>
          <label className={classes["payment-form__checkbox"]}>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span className={classes["payment-form__checkbox-item"]}>Онлайн</span>
            
          </label>
          <div className={classes["payment-form__online"]}>
            <span className={classes["payment-form__online-text"]}>
              Банковской картой
            </span>
            <span className={classes["payment-form__online-text"]}>PayPal</span>
            <span className={classes["payment-form__online-text"]}>
              Visa QIWI Wallet
            </span>
          </div>
        </div>

        <div className={classes["payment-form__info"]}>
          <label className={classes["payment-form__checkbox"]}>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <span className={classes["payment-form__checkbox-item"]}>Наличными</span>
            
          </label>
        </div>
        {formError && (
          <div className={classes["payment-form-error"]}>
  
            <ErrorIcon  />
            {formError}
          </div>
        )}
      </form>

      <div className={classes["payment-form-button-container"]}>
        <button
          className={cn(classes["payment-form-button"], "shadow-button")}
          onClick={handleSubmit}
        >
          КУПИТЬ БИЛЕТЫ
        </button>
      </div>
    </div>
  );
};
