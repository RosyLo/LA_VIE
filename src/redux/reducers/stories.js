import { RECIEVED_STORIES, ADD_STORY, DELETE_STORY, EDIT_STORY } from '../actionTypes';

const stories = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_STORIES: {
      return action.payload.story;
    }
    case ADD_STORY: {
      console.log(action.payload.story);
      return [...state, action.payload.stateStory];
    }
    case DELETE_STORY: {
      return state.filter((story) => story.storyID !== action.payload.deleteStory.storyID);
    }
    case EDIT_STORY: {
      console.log('EDIT_POST');
      console.log(action.payload);
      let editStoryList = state.map((story) => {
        if (story.storyID === action.payload.stateStory.storyID) {
          return action.payload.stateStory;
        }
        return story;
      });
      return editStoryList;
    }

    default:
      return state;
  }
};

export default stories;

// console.log('EDIT_POST');
// console.log(state);
// let editPostList = state.map((post) => {
//   console.log(post);
//   if (post.postID === action.payload.post.postID) {
//     console.log(action.payload.post);
//     return action.payload.post;
//     // return {post , action.payload}
//   }
//   return post;
// });
// console.log(editPostList);
// return editPostList;
