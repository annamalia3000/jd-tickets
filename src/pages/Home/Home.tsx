import { Direction } from "../../components/Direction/Direction";
import { Loader } from "../../components/Loader/Loader";

import { About } from './HomeComponents/About/About';
import { HowWorks } from './HomeComponents/HowWorks/HowWorks';
import { Reviews } from './HomeComponents/Reviews/Reviews';
import classes from './home.module.css';

export const Home = () => {
  return (
    <div className={classes['home']}>
            <section className={classes['home__section']}><Direction/></section>
      <section className={classes['home__section']}><About/></section>
      <section className={classes['home__section']}><HowWorks/></section>
      <section className={classes['home__section']}><Reviews/></section>
      <Loader />
    </div>
  );
};
