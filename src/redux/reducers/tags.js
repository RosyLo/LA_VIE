import { RECIEVED_TAGS, UPDATE_TAG, ADD_TAG } from '../actionTypes';

const tags = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_TAGS: {
      console.log(action.payload.tags);
      return action.payload.tags;
    }
    case UPDATE_TAG: {
      console.log(action.payload.tags);
      return action.payload.tags;
    }
    case ADD_TAG: {
      console.log(action.payload.tagData);
      return [...state, action.payload.tagData];
    }
    default:
      return state;
  }
};

export default tags;
