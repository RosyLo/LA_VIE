import { RECIEVED_MASTERPOSTS } from '../actionTypes';

const masterposts = (state = [], action) => {
  switch (action.type) {
    case RECIEVED_MASTERPOSTS: {
      return action.payload.masterPosts;
    }
    default:
      return state;
  }
};

export default masterposts;
