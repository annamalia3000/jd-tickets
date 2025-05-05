import { Direction } from "../Direction/Direction";
import classes from "./banner.module.css";

type BannerProps = {
  titleThin?: string;
  titleBold?: string;
  img: string;
};

export const Banner = ({ titleThin, titleBold, img }: BannerProps) => {
  return (
    <div className={classes["banner"]}>
      <img src={img} alt="баннер" className={classes["banner__img"]} />
      <div className={classes["banner__content"]}>
        <h3 className={classes["banner__title"]}>
          <span className={classes["banner__title-thin"]}>{titleThin}</span>
          <br />
          <span className={classes["banner__title-bold"]}>{titleBold}</span>
        </h3>
        <div className={classes["banner__direction"]}>
          <Direction />
        </div>
      </div>
    </div>
  );
};
