import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";

import { Header } from "./Header/Header";
import classes from "./layout.module.css";

export const Layout = () => {
  return (
    <div className={classes["container"]}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
