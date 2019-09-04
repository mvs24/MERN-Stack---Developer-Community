import {
  GET_POSTS,
  ADD_POST,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loding: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        
      }
    default:
      return state;
  }
}
