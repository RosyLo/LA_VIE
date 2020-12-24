import { RECIEVING_LOADING } from '../actionTypes';

const loading = (state = true, action) => {
  console.log(state);
  switch (action.type) {
    case RECIEVING_LOADING: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default loading;
