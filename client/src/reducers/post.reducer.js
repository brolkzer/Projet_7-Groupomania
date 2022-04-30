import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const likesArray = [action.payload.userId, ...post.likes];
          const likesStrings = likesArray.join("");
          return {
            ...post,
            likes: likesStrings,
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          const likesArray = post.likes.match(/.{1,36}/g);
          const likesFiltering = likesArray.filter(
            (id) => id != action.payload.userId
          );
          const likesStrings = likesFiltering.join("");

          return {
            ...post,
            likes: likesStrings,
          };
        }
        return post;
      });

    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            content: action.payload.content,
          };
        }
        return post;
      });

    case DELETE_POST:
      return state.filter((post) => post.id != action.payload.postId);

    default:
      return state;
  }
}
