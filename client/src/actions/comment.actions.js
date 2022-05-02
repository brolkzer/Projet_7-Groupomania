import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = () => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/comment/`,
    })
      .then((res) => dispatch({ type: GET_COMMENTS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const createComment = (postId, commenterId, content) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/comment/${commenterId}`,
      data: { postId, content },
    })
      .then((res) => dispatch({ type: CREATE_COMMENT, payload: { postId } }))
      .catch((err) => console.log(err));
  };
};

export const editComment = (commentId, content) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/comment/${commentId}`,
      data: { content },
    })
      .then((res) =>
        dispatch({ type: EDIT_COMMENT, payload: { content, commentId } })
      )
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/comment/${commentId}`,
    })
      .then((res) => dispatch({ type: DELETE_COMMENT, payload: { commentId } }))
      .catch((err) => console.log(err));
  };
};
