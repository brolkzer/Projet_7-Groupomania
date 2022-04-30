import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case FOLLOW_USER:
      const followsArray = [action.payload.idToFollow, ...state.following];
      const followsStrings = followsArray.join("");

      return {
        ...state,
        following: followsStrings,
      };
    case UNFOLLOW_USER:
      const followArray = state.following.match(/.{1,32}/g);
      const followFiltering = followArray.filter(
        (id) => id != action.payload.idToFollow
      );
      const followStrings = followFiltering.join("");

      return {
        ...state,
        following: followStrings,
      };

    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    default:
      return state;
  }
}
