import { RECEIVED_WELCOMEPOSTS } from '../actionTypes';

const welcomeposts = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_WELCOMEPOSTS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default welcomeposts;
