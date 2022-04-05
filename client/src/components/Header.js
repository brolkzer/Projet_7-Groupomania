import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <ul>
        <NavLink to="/">
          <li>
            <img
              src="./assets/icon-left-font-monochrome-white.svg"
              className="logo"
              alt=""
            />
          </li>
        </NavLink>
        <NavLink to="/">
          <li>Se déconnecter</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;
