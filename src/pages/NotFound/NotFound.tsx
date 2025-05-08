import { Link } from "react-router-dom";
import cn from 'classnames';
import classes from './notFound.module.css';

export const NotFound = () => {
  return (
    <div className={classes["notfound"]}>
        <h3 className={classes["notfound__title"]}>Извините, такая страница не найдена!</h3>
        <Link className={cn(classes["notfound__button"], "dark-button")} to="/">вернуться на главную</Link>
    </div>
  )
}
