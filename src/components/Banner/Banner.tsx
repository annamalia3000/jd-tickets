import { Direction } from "../Direction/Direction";
import cn from "classnames";
import classes from "./banner.module.css";

type BannerProps = {
  titleThin?: string;
  titleBold?: string;
  img: string;
  direction: boolean;
  extraClasses?: boolean;
};

export const Banner = ({
  titleThin,
  titleBold,
  img,
  direction,
  extraClasses,
}: BannerProps) => {
  return (
    <div className={classes["banner"]}>
      <img src={img} alt="баннер" className={classes["banner__img"]} />

      <div
        className={cn(classes["banner__content"], {
          [classes["banner__content-row"]]: extraClasses,
        })}
      >
        {titleBold && titleThin && (
          <h3 className={classes["banner__title"]}>
            <span className={classes["banner__title-thin"]}>{titleThin}</span>
            <br />
            <span className={classes["banner__title-bold"]}>{titleBold}</span>
          </h3>
        )}
        {direction && (
          <div className={classes["banner__direction"]}>
            <Direction extraClasses={extraClasses} />
          </div>
        )}
      </div>
    </div>
  );
};
