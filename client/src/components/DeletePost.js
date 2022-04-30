import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../actions/post.actions";

const DeletePost = ({ post }) => {
  const dispatch = useDispatch();

  const destroyPost = () => {
    dispatch(deletePost(post.id));
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
