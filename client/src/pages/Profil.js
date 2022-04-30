import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../actions/user.actions";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UploadImage from "../components/UploadImage";
import FollowButton from "../components/FollowButton";
import { dateParser, isEmpty } from "../components/Utils";

const Profil = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="page-profil">
        <div className="user-desc">
          <h1>
            Profil de {userData.firstName} {userData.lastName}
          </h1>
          <div className="user-global-container">
            <div className="user-left-container">
              <h2>Photo de profil</h2>
              <img
                src={userData.picture}
                alt={
                  "Photo de profil de " +
                  userData.firstName +
                  " " +
                  userData.lastName
                }
              />
              <UploadImage />
            </div>
            <div className="user-right-container">
              <div className="bio-update">
                <h1>Bio</h1>
                {updateForm === false && (
                  <>
                    <p>{userData.bio}</p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                      Modifier bio
                    </button>
                  </>
                )}
                {updateForm && (
                  <>
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                    ></textarea>
                    <button onClick={handleUpdate}>
                      Valider les modifications
                    </button>
                  </>
                )}
                <p>Membre depuis le : {dateParser(userData.createdAt)}</p>
                <p onClick={() => setFollowingPopup(true)}>
                  Abonnements :
                  {userData.following
                    ? " " + userData.following.match(/.{1,32}/g).length
                    : " 0"}
                </p>
                <p onClick={() => setFollowersPopup(true)}>
                  Abonnés :
                  {userData.followers
                    ? userData.followers.match(/.{1,32}/g).length
                    : " 0"}
                </p>
                {followingPopup && (
                  <div className="popup-profil-container">
                    <div className="modal">
                      <p>Abonnements : </p>
                      <span
                        className="cross"
                        onClick={() => setFollowingPopup(false)}
                      >
                        &#10005;
                      </span>
                      <ul>
                        {usersData.map((user) => {
                          for (let i = 0; i < usersData.length; i++) {
                            if (
                              !isEmpty(userData.following) &&
                              userData.following
                                .match(/.{1,32}/g)
                                .includes(user.id)
                            ) {
                              return (
                                <li key={user.id}>
                                  <img
                                    src={user.picture}
                                    alt={
                                      "Photo de " +
                                      user.firstName +
                                      " " +
                                      user.lastName
                                    }
                                  />
                                  <p>
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <FollowButton idToFollow={user.id} />
                                </li>
                              );
                            }
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )}
                {followersPopup && (
                  <div className="popup-profil-container">
                    <div className="modal">
                      <p>Abonnés : </p>
                      <span
                        className="cross"
                        onClick={() => setFollowersPopup(false)}
                      >
                        &#10005;
                      </span>
                      <ul>
                        {usersData.map((user) => {
                          for (let i = 0; i < usersData.length; i++) {
                            if (
                              !isEmpty(userData.followers) &&
                              userData.followers
                                .match(/.{1,32}/g)
                                .includes(user.id)
                            ) {
                              return (
                                <li key={user.id}>
                                  <img
                                    src={user.picture}
                                    alt={
                                      "Photo de " +
                                      user.firstName +
                                      " " +
                                      user.lastName
                                    }
                                  />
                                  <p>
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <FollowButton />
                                </li>
                              );
                            }
                            if (isEmpty(userData.followers)) return "";
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
