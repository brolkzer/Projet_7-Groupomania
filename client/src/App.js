import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Log from "./pages/Log";
import Profil from "./pages/Profil";
import Utilisateurs from "./pages/Utilisateurs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Accueil />}></Route>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/Profil" element={<Profil />}></Route>
        <Route path="/Utilisateurs" element={<Utilisateurs />}></Route>
        <Route path="/Log" element={<Log />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
