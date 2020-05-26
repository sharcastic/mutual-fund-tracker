import React, { useState } from "react";

import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as ProfileIcon } from "../../assets/list.svg";
import { ReactComponent as ListIcon } from "../../assets/profile.svg";
// import { navItems } from "../../constants";
// import { ReactComponent as SiteLogo } from "../../assets/icons/site-logo.svg";
import "./Navbar.scss";

const navItems = [
  { title: "Home", Icon: HomeIcon },
  { title: "Watchlist", Icon: ListIcon },
  { title: "Profile", Icon: ProfileIcon },
];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(navItems[0].title);
  const onNavItemClick = (e) => setActiveItem(e.currentTarget.dataset.key);
  return (
    <nav className="navbar">
      {navItems.map(({ Icon, title }) => (
        <div
          className={
            activeItem === title ? "nav-item--active nav-item" : "nav-item"
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
