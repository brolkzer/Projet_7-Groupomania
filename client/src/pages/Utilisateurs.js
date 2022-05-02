import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../actions/users.action";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserCard from "../components/UserCard";
import { isEmpty } from "../components/Utils";

const Utilisateurs = () => {
  const [loadUsers, setLoadUsers] = useState(true);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersReducer);

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
            usersData.map((user) => {
              return <UserCard user={user} key={user.id} />;
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default Utilisateurs;
