import { SEARCH_TAGS, NOSEARCH_TAGS } from '../actionTypes';

const searchtags = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case SEARCH_TAGS: {
      return action.payload.newValue;
    }
    case NOSEARCH_TAGS: {
      return [];
    }

    default:
      return state;
  }
};

export default searchtags;
