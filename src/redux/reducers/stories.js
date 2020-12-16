import { RECIEVED_STORIES, ADD_STORY, DELETE_STORY } from '../actionTypes';

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
      console.log(action.payload.deleteStory.storyID);
      return state.filter((story) => story.storyID !== action.payload.deleteStory.storyID);
    }

    default:
      return state;
  }
};

export default stories;
