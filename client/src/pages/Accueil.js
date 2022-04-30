import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";

const Accueil = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="main">
        <Thread />
      </div>
    </>
  );
};

export default Accueil;
