import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const removeCookie = (key) => {
    Cookies.remove(key);
  };
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };
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
          <li onClick={logout}>Se déconnecter</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;
