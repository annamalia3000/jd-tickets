import classes from "./reviewsItem.module.css";

type ReviewItemProps = {
  img: string;
  name: string;
  text: string;
};
export const ReviewItem = ({ img, name, text }: ReviewItemProps) => {
  return (
    <div className={classes["reviews__item"]}>
      <img src={img} alt="аватар" className={classes["reviews__item-img"]} />

      <div className={classes["reviews__item-content"]}>
        <h4 className={classes["reviews__item-name"]}>{name}</h4>
        <div className={classes["reviews__item-text"]}>{text}</div>
      </div>
    </div>
  );
};
