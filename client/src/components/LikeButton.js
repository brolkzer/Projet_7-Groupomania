import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../actions/post.actions";
import { UidContext } from "./AppContext";
import { isEmpty } from "./Utils";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post.id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (!isEmpty(post.likes) && post.likes.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likes, liked]);
  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./assets/icons/heart.svg" onClick={like} alt="like-icon" />
      )}
      {uid && liked && (
        <img
          src="./assets/icons/heart-filled.svg"
          onClick={unlike}
          alt="unlike-icon"
        />
      )}
      <span>
        {post.likes ? " " + post.likes.match(/.{1,36}/g).length : " 0"}
      </span>
    </div>
  );
};

export default LikeButton;
