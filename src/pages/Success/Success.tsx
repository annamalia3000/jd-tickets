import { Banner } from "../../components/Banner/Banner";

import { SuccessOrder } from "../../components/SuccessOrder/SuccessOrder";
import classes from "./success.module.css";

export const Success = () => {
  return (
    <div className={classes["success"]}>
      <Banner titleThin =" " titleBold="Благодарим Вас за заказ!" img="img/success-banner.png"  direction={false} />

      <div className={classes["success__content"]}>
        <SuccessOrder />
      </div>
    </div>
  );
};
