import { useLocation } from "react-router-dom";

import classes from "./header.module.css";
type HeaderProps = {
  banner?: React.ReactNode;
};

export const Header = ({ banner }: HeaderProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { label: "О нас", link: "#about" },
    { label: "Как это работает", link: "#how" },
    { label: "Отзывы", link: "#reviews" },
    { label: "Контакты", link: "#contacts" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (!isHome) {
      e.preventDefault();
      window.location.href = "/" + link;
    }
  };

  return (
    <div className={classes["header"]}>
      <div className={classes["header__logo"]}>Лого</div>
      <nav className={classes["header__nav"]}>
        {navItems.map((item, index) => (
          <a
            key={index}
            onClick={(e) => handleNavClick(e, item.link)}
            href={item.link}
            className={classes["header__link"]}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className={classes["header__banner"]}>{banner}</div>
    </div>
  );
};
