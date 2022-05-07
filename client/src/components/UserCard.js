import React from "react";
import { useSelector } from "react-redux";
import FollowButton from "./FollowButton";

const UserCard = ({ user }) => {
  const userData = useSelector((state) => state.userReducer);

  const userRelocate = () => {
    window.location.href = `/User?=${user.firstName}_${user.lastName}`;
  };

  return (
    <>
      {user.id != userData.id && (
        <>
          <li className="user-card" key={user.id}>
            <div className="user-desc">
              <img
                onClick={() => userRelocate()}
                src={user.picture}
                alt={
                  "Photo de l'utilisateur:" +
                  " " +
                  user.firstName +
                  " " +
                  user.lastName
                }
                className="user-picture"
              />
              <div className="user-infos">
                <p onClick={() => userRelocate()} className="user-name">
                  {user.firstName} {user.lastName}
                </p>
                <p className="user-bio">{user.bio}</p>
              </div>
            </div>
            <div className="user-follow" id={user.id}>
              <FollowButton idToFollow={user.id} />
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default UserCard;
