import React, { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const Log = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="log-page">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : ""}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signUpModal ? "active-btn" : ""}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
