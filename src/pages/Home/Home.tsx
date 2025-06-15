import { Banner } from "../../components/Banner/Banner";

import { About } from "./HomeComponents/About/About";
import { HowWorks } from "./HomeComponents/HowWorks/HowWorks";
import { Reviews } from "./HomeComponents/Reviews/Reviews";
import classes from "./home.module.css";

export const Home = () => {
  return (
    <div className={classes["home"]}>
      <Banner
        titleThin="Вся жизнь - "
        titleBold="путешествие!"
        img="/img/home-banner.jpeg"
        direction={true}
      />
      <section className={classes["home__section"]}>
        <About />
      </section>
      <section className={classes["home__section"]}>
        <HowWorks />
      </section>
      <section className={classes["home__section"]}>
        <Reviews />
      </section>
    </div>
  );
};
