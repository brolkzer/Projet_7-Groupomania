import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const firstNameError = document.querySelector(".firstNameErrorMsg");
  const lastNameError = document.querySelector(".lastNameErrorMsg");
  const emailError = document.querySelector(".emailErrorMsg");
  const passwordError = document.querySelector(".passwordErrorMsg");
  const passwordConfirmError = document.querySelector(
    ".password-confirmErrorMsg"
  );

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.match(/^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/)) {
      emailError.innerHTML = "Veuillez renseigner une adresse email valide";
    } else if (
      (firstName.length > 0 && firstName.length < 3) ||
      firstName.length > 20
    ) {
      firstNameError.innerHTML =
        "Le prénom doit comprendre entre 3 et 20 caractères";
    } else if (!firstName.match(/^[a-zA-Z0-9_.-]*$/)) {
      firstNameError.innerHTML =
        "Le prénom de doit pas contenir de caractères spéciaux";
    } else if (
      (lastName.length > 0 && lastName.length < 3) ||
      lastName.length > 20
    ) {
      lastNameError.innerHTML =
        "Le prénom doit comprendre entre 3 et 20 caractères";
    } else if (!lastName.match(/^[a-zA-Z0-9_.-]*$/)) {
      lastNameError.innerHTML =
        "Le prénom de doit pas contenir de caractères spéciaux";
    } else if (
      (password.length > 0 && password.length < 3) ||
      password.length > 20
    ) {
      passwordError.innerHTML =
        "Le mot de passe doit comprendre entre 3 et 20 caractères";
    } else if (password != controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/sign-up`,
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then(() => {
          window.location = "/Log";
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <h1>Inscrivez vous dès maintenant !</h1>
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
        <div className="firstNameErrorMsg"></div>
        <br />
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
        <div className="lastNameErrorMsg"></div>
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <div className="emailErrorMsg"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <div className="passwordErrorMsg"></div>
        <br />
        <label htmlFor="password-confirm">Confirmer votre mot de passe</label>
        <input
          type="password"
          name="password"
          id="password-confirm"
          onChange={(e) => {
            setControlPassword(e.target.value);
          }}
          value={controlPassword}
        />
        <div className="password-confirmErrorMsg"></div>
        <br />
        <input type="submit" value="Valider l'inscription" />
      </form>
    </>
  );
};

export default SignUpForm;
