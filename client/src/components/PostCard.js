import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "./Utils";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import { updatePost } from "../actions/post.actions";
import { getComments } from "../actions/comment.actions";
import DeletePost from "./DeletePost";
import CardComments from "./CardComments";

const PostCard = ({ post }) => {
  const [loadComment, setLoadComment] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const commentData = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadComment) {
      dispatch(getComments());
      setLoadComment(false);
    }
  }, [loadComment, dispatch]);

  const updateContent = () => {
    if (textUpdate) {
      dispatch(
        updatePost(
          post.id,
          post.posterId,
          textUpdate,
          userData.id,
          userData.mod
        )
      );
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.posterId) return user.picture;
                  })
                  .join("")
              }
              alt="Photo de l'utilisateur"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.posterId)
                          return user.firstName + " " + user.lastName;
                      })
                      .join("")}
                </h3>
                {post.posterId != userData.id && (
                  <FollowButton idToFollow={post.posterId} />
                )}
              </div>
              <span className="sign-date">{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateContent}>
                    Valider
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="" className="post-pic" />
            )}
            {post.video && (
              <iframe
                width="560"
                height="315"
                src={post.video}
                title="MediaPlayer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
            {userData.id === post.posterId || userData.mod === true ? (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./assets/icons/edit.svg" alt="edit-icon" />
                </div>
                <DeletePost post={post} />
              </div>
            ) : null}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./assets/icons/message1.svg"
                  alt="comment"
                />
                <span>
                  {!isEmpty(commentData)
                    ? " " +
                      commentData.filter(
                        (comment) => comment.postId === post.id
                      ).length
                    : " 0"}
                </span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default PostCard;
