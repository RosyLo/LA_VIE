import { ADD_POST, EDIT_POST, DELETE_POST, RECIEVED_POSTS, TOGGLE_LIKE_POST } from '../actionTypes';

const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST: {
      return [...state, action.payload.post];
    }
    case DELETE_POST: {
      return state.filter((post) => post.postID !== action.payload.postID);
    }

    case EDIT_POST: {
      let editPostList = state.map((post) => {
        console.log(post);
        if (post.postID === action.payload.post.postID) {
          console.log(action.payload.post);
          return action.payload.post;
        }
        return post;
      });
      return editPostList;
    }

    case RECIEVED_POSTS: {
      return action.payload.postsList;
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
