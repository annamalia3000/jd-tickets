import { Direction } from "../Direction/Direction";
import cn from "classnames";
import classes from "./banner.module.css";

type BannerProps = {
  titleThin?: string;
  titleBold?: string;
  img: string;
  extraClasses?: boolean;
};

export const Banner = ({ titleThin, titleBold, img, extraClasses }: BannerProps) => {
  return (
    <div className={classes["banner"]}>
      <img src={img} alt="баннер" className={classes["banner__img"]} />
      <div className={cn(classes["banner__content"], { [classes["banner__content-row"]]: extraClasses })}>
        {titleThin && titleBold && (
          <h3 className={classes["banner__title"]}>
            <span className={classes["banner__title-thin"]}>{titleThin}</span>
            <br />
            <span className={classes["banner__title-bold"]}>{titleBold}</span>
          </h3>
        )}
        <div className={classes["banner__direction"]}>
          <Direction extraClasses={extraClasses} />
        </div>
      </div>
    </div>
  );
};
