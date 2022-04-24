import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UploadImage from "../components/UploadImage";

const Profil = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <>
      <Header />
      <Navigation />
      <div className="page-profil">
        <div className="user-desc">
          <h1>
            Profil de {userData.firstName} {userData.lastName}
          </h1>
          <div className="user-global-container">
            <div className="user-left-container">
              <h2>Photo de profil</h2>
              <img
                src={userData.picture}
                alt={
                  "Photo de profil de " +
                  userData.firstName +
                  " " +
                  userData.lastName
                }
              />
              <UploadImage />
            </div>
            <div className="user-right-container"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
