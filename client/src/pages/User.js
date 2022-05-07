import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import FollowButton from "../components/FollowButton";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import PostCard from "../components/PostCard";
import { dateParser, isEmpty } from "../components/Utils";

const User = () => {
  const postData = useSelector((state) => state.postReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
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

  var paramsString = window.location;
  var searchParams = new URLSearchParams(paramsString)
    .getAll("search")
    .toString()
    .split("=")[1]
    .split("_");

  return (
    <>
      <Header />
      <Navigation />
      {!isEmpty(usersData) &&
        usersData
          .filter(
            (user) =>
              user.firstName + user.lastName ===
              searchParams[0] + searchParams[1]
          )
          .map((user) => {
            return (
              <div className="user-page" key={user.id}>
                <div className="user-desc">
                  <div className="user-global-container">
                    <div className="user-left-container">
                      <img
                        src={user.picture}
                        alt={
                          "Photo de profil de " +
                          user.firstName +
                          " " +
                          user.lastName
                        }
                      />
                    </div>
                    <div className="user-right-container">
                      <div className="bio-update">
                        <p className="bio-title">Bio</p>
                        <p className="bio-content">{user.bio}</p>

                        <p
                          className="followhandlers"
                          onClick={() => setFollowingPopup(true)}
                        >
                          Abonnements :
                          {user.following
                            ? " " + user.following.match(/.{1,36}/g).length
                            : " 0"}
                        </p>
                        <p
                          className="followhandlers"
                          onClick={() => setFollowersPopup(true)}
                        >
                          Abonnés :
                          {user.followers
                            ? " " + user.followers.match(/.{1,36}/g).length
                            : " 0"}
                        </p>
                        <p className="bio-date">
                          Membre depuis le : {dateParser(user.createdAt)}
                        </p>
                        {followingPopup && (
                          <div className="popup-profil-container">
                            <div className="modal">
                              <p className="modal-title">Abonnements : </p>
                              <span
                                className="cross"
                                onClick={() => setFollowingPopup(false)}
                              >
                                &#10005;
                              </span>
                              <ul>
                                {usersData.map((userModal) => {
                                  for (let i = 0; i < usersData.length; i++) {
                                    if (
                                      !isEmpty(user.following) &&
                                      user.following
                                        .match(/.{1,36}/g)
                                        .includes(userModal.id)
                                    ) {
                                      return (
                                        <li key={userModal.id}>
                                          <img
                                            src={userModal.picture}
                                            alt={
                                              "Photo de " +
                                              userModal.firstName +
                                              " " +
                                              userModal.lastName
                                            }
                                          />
                                          <p>
                                            {userModal.firstName}{" "}
                                            {userModal.lastName}
                                          </p>
                                          {userModal.id != userData.id && (
                                            <FollowButton
                                              idToFollow={userModal.id}
                                            />
                                          )}
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
                              <p className="modal-title">Abonnés : </p>
                              <span
                                className="cross"
                                onClick={() => setFollowersPopup(false)}
                              >
                                &#10005;
                              </span>
                              <ul>
                                {usersData.map((userModal) => {
                                  for (let i = 0; i < usersData.length; i++) {
                                    if (
                                      !isEmpty(user.followers) &&
                                      user.followers
                                        .match(/.{1,36}/g)
                                        .includes(userModal.id)
                                    ) {
                                      return (
                                        <li key={userModal.id}>
                                          <img
                                            src={userModal.picture}
                                            alt={
                                              "Photo de " +
                                              userModal.firstName +
                                              " " +
                                              userModal.lastName
                                            }
                                          />
                                          <p>
                                            {userModal.firstName}{" "}
                                            {userModal.lastName}
                                          </p>
                                          {userModal.id != userData.id && (
                                            <FollowButton
                                              idToFollow={userModal.id}
                                            />
                                          )}
                                        </li>
                                      );
                                    }
                                    if (isEmpty(user.followers)) return "";
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
                        .filter((postdata) => postdata.posterId === user.id)
                        .map((post) => <PostCard post={post} />)}
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default User;
