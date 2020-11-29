import { ADD_POST, RECIEVED_POSTS, TOGGLE_LIKE_POST } from '../actionTypes';

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST: {
      return [...state, action.payload.post];
    }
    case RECIEVED_POSTS: {
      return action.payload.posts;
    }
    case TOGGLE_LIKE_POST: {
      return state.map((post) => {
        if (post.postID === action.payload.postID) {
          return { ...post, postLikes: action.payload.postLikes };
        }
        return post;
      });
    }
    default:
      return state;
  }
};

export default posts;
