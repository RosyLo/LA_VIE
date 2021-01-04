import { RECIEVED_STORIES, ADD_STORY, DELETE_STORY, EDIT_STORY } from '../actionTypes';

const stories = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_STORIES: {
      return action.payload.story;
    }
    case ADD_STORY: {
      return [action.payload.stateStory, ...state];
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
