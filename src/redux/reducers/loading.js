import { RECIEVING_LOADING } from '../actionTypes';

const loading = (state = true, action) => {
  switch (action.type) {
    case RECIEVING_LOADING: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default loading;
