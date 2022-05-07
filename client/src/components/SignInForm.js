import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const errorId = document.querySelector(".error.id");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/sign-in`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        Cookies.set("jwt", res.data.token, {
          expires: 7,
          sameSite: "none",
          secure: true,
        });
        window.location = "/";
      })
      .catch(() => {
        errorId.innerHTML = "Indentifiants incorrects !";
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-in-form">
      <h1>Entrez vos identifiants pour vous connecter !</h1>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => {
          errorId.innerHTML = "";
          setPassword(e.target.value);
        }}
        value={password}
      />
      <br />
      <div className="error id"></div>
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
