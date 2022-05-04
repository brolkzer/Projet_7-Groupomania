import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../actions/user.actions";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UploadImage from "../components/UploadImage";
import PostCard from "../components/PostCard";
import { dateParser, isEmpty } from "../components/Utils";
import { getPosts } from "../actions/post.actions";
import FollowButton from "../components/FollowButton";

const Profil = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const postData = useSelector((state) => state.postReducer);
  const commentData = useSelector((state) => state.commentReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch]);

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
          <div className="user-global-container">
            <div className="user-left-container">
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
                <p>Bio</p>
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
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                    ></textarea>
                    <button onClick={handleUpdate}>
                      Valider les modifications
                    </button>
                  </>
                )}

                <p onClick={() => setFollowingPopup(true)}>
                  Abonnements :
                  {userData.following
                    ? " " + userData.following.match(/.{1,36}/g).length
                    : " 0"}
                </p>
                <p onClick={() => setFollowersPopup(true)}>
                  Abonnés :
                  {userData.followers
                    ? " " + userData.followers.match(/.{1,36}/g).length
                    : " 0"}
                </p>
                <p>Membre depuis le : {dateParser(userData.createdAt)}</p>
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
                                .match(/.{1,36}/g)
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
                                .match(/.{1,36}/g)
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
        <div className="profil-posts">
          <div className="user-posts">
            {!isEmpty(postData) &&
              postData
                .filter((postdata) => postdata.posterId === userData.id)
                .map((post) => <PostCard post={post} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
