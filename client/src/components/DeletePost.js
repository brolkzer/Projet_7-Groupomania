import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/post.actions";

const DeletePost = ({ post }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const destroyPost = async () => {
    dispatch(deletePost(post.id, post.posterId, userData.id, userData.mod));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez vous vraiment supprimer ce post ? ")) {
          destroyPost();
        }
      }}
    >
      <img src="./assets/icons/trash.svg" alt="delete-icon" />
    </div>
  );
};

export default DeletePost;
