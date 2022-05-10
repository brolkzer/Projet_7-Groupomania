import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";
import { getUsers } from "../actions/users.action";
import { isEmpty } from "./Utils";

const FollowButton = ({ idToFollow }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData.id, idToFollow))
      .then(() => {
        dispatch(getUsers());
        setIsFollowed(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData.id, idToFollow))
      .then(() => {
        dispatch(getUsers());
        setIsFollowed(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      }
    } else {
      setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span className="followhandler" onClick={handleUnfollow}>
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span className="followhandler" onClick={handleFollow}>
          <button className="follow-btn">S'abonner</button>
        </span>
      )}
    </>
  );
};

export default FollowButton;
