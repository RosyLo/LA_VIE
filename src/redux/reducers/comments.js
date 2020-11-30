import { ADD_COMMENT } from '../actionTypes';

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      return [...state, action.payload.comment];
    }
    default:
      return state;
  }
};

export default comments;
