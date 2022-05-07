import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../actions/comment.actions";
import EditDeleteComment from "./EditDeleteComment";
import FollowButton from "./FollowButton";
import { dateParser, isEmpty } from "./Utils";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentData = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(createComment(post.id, userData.id, text))
        .then(() => dispatch(getComments()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {commentData.map((comment) => {
        if (comment.postId === post.id) {
          return (
            <div className="comment-container" key={comment.id}>
              <div className="left-part">
                <img
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === comment.commenterId)
                          return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt=""
                />
              </div>
              <div className="right-part">
                <div className="comment-header">
                  <div className="pseudo">
                    <span>
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.commenterId)
                              return user.firstName + " " + user.lastName;
                            else return null;
                          })
                          .join("")}
                    </span>
                    {comment.commenterId != userData.id && (
                      <FollowButton idToFollow={comment.commenterId} />
                    )}
                  </div>
                  <span className="comment-date">
                    {dateParser(comment.createdAt)}
                  </span>
                </div>
                <p>{comment.content}</p>
                <EditDeleteComment comment={comment} />
              </div>
            </div>
          );
        }
      })}
      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laissez un commentaire"
        />
        <br />
        <input type="submit" defaultValue="Envoyer" />
      </form>
    </div>
  );
};

export default CardComments;
