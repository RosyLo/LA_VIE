import { RECIEVED_STORIES } from '../actionTypes';

const stories = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_STORIES: {
      return action.payload.story;
    }

    default:
      return state;
  }
};

export default stories;
