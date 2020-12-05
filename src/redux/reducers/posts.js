import { ADD_POST, DELETE_POST, RECIEVED_POSTS, TOGGLE_LIKE_POST } from '../actionTypes';

const posts = (state = [], action) => {
  console.log('post');
  console.log(state);
  switch (action.type) {
    case ADD_POST: {
      return [...state, action.payload.post];
    }
    case DELETE_POST: {
      return state.filter((post) => post.postID !== action.payload.postID);
    }

    case RECIEVED_POSTS: {
      return action.payload.posts;
    }
    case TOGGLE_LIKE_POST: {
      return state.map((post) => {
        if (post.postID === action.payload.id) {
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
