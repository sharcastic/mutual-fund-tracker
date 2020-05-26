import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as ListIcon } from "../../assets/list.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
// import { navItems } from "../../constants";
// import { ReactComponent as SiteLogo } from "../../assets/icons/site-logo.svg";
import "./Navbar.scss";

const navItems = [
  { title: "Home", Icon: HomeIcon },
  { title: "Watchlist", Icon: ListIcon },
  { title: "Profile", Icon: ProfileIcon },
];

const Navbar = ({ disabledRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [activeItem, setActiveItem] = useState();
  // const onNavItemClick = (e) => setActiveItem(e.currentTarget.dataset.key);
  const onNavItemClick = ({
    currentTarget: {
      dataset: { key },
    },
  }) => {
    const targetRoute = key.toLowerCase();
    const currentRoute = location.pathname.slice(1);
    if (targetRoute !== currentRoute) {
      navigate(`/${targetRoute}`);
    }
  };

  useEffect(() => {
    const activeRoute = location.pathname.slice(1);
    setActiveItem(activeRoute);
  }, [location]);

  if (disabledRoutes.indexOf(location.pathname) > -1) {
    return null;
  }
  return (
    <nav className="navbar">
      {navItems.map(({ Icon, title }) => (
        <div
          className={
            activeItem === title.toLowerCase()
              ? "nav-item--active nav-item"
              : "nav-item"
          }
          key={title}
          data-key={title}
          onClick={onNavItemClick}
        >
          <Icon className="nav-icon" title={title} />
          <span className="nav-item__title">{title}</span>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
