import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../actions/user.actions";

const FollowButton = ({ idToFollow }) => {
  // console.log(idToFollow);
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData[0].id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData.id, idToFollow));
    setIsFollowed(false);
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
        <span onClick={handleUnfollow}>
          <button className="unfollow-btn">Abonné</button>
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <button className="follow-btn">S'abonner</button>
        </span>
      )}
    </>
  );
};

export default FollowButton;
