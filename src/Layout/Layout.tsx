import {Outlet} from "react-router-dom";
import { Footer } from "./Footer/Footer";
import classes from './layout.module.css';


export const Layout = () => {
  return (
    <div className={classes["container"]}>
        <main>
        <Outlet />
        </main>
        <Footer/>
       
    </div>
  )
}
