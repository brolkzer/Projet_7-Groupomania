import { FOLLOW_USER, GET_USER, UNFOLLOW_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case FOLLOW_USER:
      const followsArray = [action.payload.idToFollow, ...state.following];
      const followsString = followsArray.join("");

      return {
        ...state,
        following: followsString,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id != action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
