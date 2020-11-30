import { RECIEVED_USER } from '../actionTypes';

const initState = JSON.parse(localStorage.getItem('User'));

const user = (state = initState, action) => {
  switch (action.type) {
    case RECIEVED_USER: {
      return action.payload.user;
    }
    default:
      return state;
  }
};

export default user;
