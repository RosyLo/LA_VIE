import { RECEIVED_RELATIONSHIP, SEND_FRIEND_REQUEST } from '../actionTypes';
const relationships = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_RELATIONSHIP: {
      return action.payload.relationships;
    }
    case SEND_FRIEND_REQUEST: {
      let newRelationship = [...state];
      newRelationship.push(action.payload.relationship);
      return newRelationship;
    }
    default:
      return state;
  }
};

export default relationships;
