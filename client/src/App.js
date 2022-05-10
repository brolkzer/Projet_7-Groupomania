import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Log from "./pages/Log";
import Profil from "./pages/Profil";
import Utilisateurs from "./pages/Utilisateurs";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import User from "./pages/User";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const cookieValue = Cookies.get("jwt");
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/jwtid`,
        data: {
          token: cookieValue,
        },
      })
        .then((res) => {
          setUid(res.data.userId.data);
        })
        .catch(() => {
          setUid("");
          console.log("no token");
        });
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          {uid ? (
            <>
              <Route path="*" element={<Accueil />}></Route>
              <Route path="/" element={<Accueil />}></Route>
              <Route path="/Profil" element={<Profil />}></Route>
              <Route path="/Utilisateurs" element={<Utilisateurs />}></Route>
              <Route path="/User" element={<User />}></Route>
              <Route path="/Log" element={<Accueil />}></Route>
            </>
          ) : (
            <Route path="*" element={<Log />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
};

export default App;
