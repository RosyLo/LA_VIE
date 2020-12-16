import { RECIEVED_TAGS, UPDATE_TAG, ADD_TAG } from '../actionTypes';

const tags = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_TAGS: {
      return action.payload.tags;
    }
    case UPDATE_TAG: {
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
