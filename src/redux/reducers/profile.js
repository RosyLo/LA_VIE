import { RECEIVED_PROFILE } from '../actionTypes';

const profile = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_PROFILE: {
      return action.payload.profile;
    }
    default:
      return state;
  }
};
export default profile;
