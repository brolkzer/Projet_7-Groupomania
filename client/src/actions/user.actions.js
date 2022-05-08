import axios from "axios";

export const GET_USER = "GET_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data[0] });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/follow/${followerId}`,
      data: { idToFollow },
    })
      .then(() => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/unfollow/${followerId}`,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/upload/${id}`, data)
      .then(() => dispatch({ type: UPLOAD_PICTURE, payload: "" }))
      .catch((err) => console.log());
  };
};

export const updateBio = (id, bio) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/api/user/bio/${id}`,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
