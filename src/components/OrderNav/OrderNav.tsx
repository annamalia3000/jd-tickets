import cn from "classnames";
import classes from "./orderNav.module.css";

type OrderNavProps = {
  activeStep: number;
};

const steps = [
  { number: 1, label: "Билеты" },
  { number: 2, label: "Пассажиры" },
  { number: 3, label: "Оплата" },
  { number: 4, label: "Проверка" },
];

export const OrderNav = ({ activeStep }: OrderNavProps) => {
  return (
    <div className={classes["order-nav"]}>
      {steps.map((step) => {
        const isActive = activeStep >= step.number;
      const isLastActive = step.number === Math.min(activeStep, 3);

        return (
          <div
            key={step.number}
            className={cn(classes["order-nav-section"], {
              [classes["active"]]: isActive,
              [classes["is-last-active"]]: isLastActive,
            })}
          >
            <button className={classes["order-nav-button"]}>
              {step.number}
            </button>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
