import { RECIEVED_STORIES, ADD_STORY } from '../actionTypes';

const stories = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_STORIES: {
      return action.payload.story;
    }
    case ADD_STORY: {
      console.log(action.payload.story);
      return [...state, action.payload.stateStory];
    }

    default:
      return state;
  }
};

export default stories;
