import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NewPostForm from "../components/NewPostForm";
import Thread from "../components/Thread";

const Accueil = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="main">
        <div className="home-header">
          <NewPostForm />
        </div>
        <Thread />
      </div>
    </>
  );
};

export default Accueil;
