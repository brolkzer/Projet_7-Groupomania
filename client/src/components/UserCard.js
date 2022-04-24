import React from "react";
import FollowButton from "./FollowButton";

const UserCard = ({ userData }) => {
  return (
    <>
      <li className="user-card" key={userData.id}>
        <div className="user-desc">
          <img
            src={userData.picture}
            alt={
              "Photo de l'utilisateur:" +
              " " +
              userData.firstName +
              " " +
              userData.lastName
            }
            className="user-picture"
          />
          <div className="user-infos">
            <p className="user-name">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="user-bio">{userData.bio}</p>
          </div>
        </div>
        <div className="user-follow" id={userData.id}>
          <FollowButton idToFollow={userData.id} />
        </div>
      </li>
      <br />
    </>
  );
};

export default UserCard;
