import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/users.action";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserCard from "../components/UserCard";

const Utilisateurs = () => {
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  const [loadUsers, setLoadUsers] = useState(true);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersReducer);
  const userDatas = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchUsers = async () => {
      if (loadUsers) {
        dispatch(getUsers());
        setLoadUsers(false);
      }
    };
    fetchUsers();
  }, [loadUsers, dispatch]);

  return (
    <>
      <Header />
      <Navigation />
      <div className="users-container">
        <ul>
          {isEmpty(usersData) ? (
            <li>Chargement...</li>
          ) : (
            usersData
              .filter((user) => user.id != userDatas.id)
              .map((userData) => {
                return <UserCard userData={userData} key={userData.id} />;
              })
          )}
        </ul>
      </div>
    </>
  );
};

export default Utilisateurs;
