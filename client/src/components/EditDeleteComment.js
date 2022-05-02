import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../actions/comment.actions";
import { UidContext } from "./AppContext";

const EditDeleteComment = ({ comment }) => {
  const [isAutor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(comment.id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) setIsAuthor(true);
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAutor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./assets/icons/edit.svg" alt="edit-icon" />
        </span>
      )}
      {isAutor && edit === true && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.content}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./assets/icons/trash.svg" alt="trash-icon" />
            </span>
            <input type="submit" defaultValue="Valider modifications " />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
