import {
  RECEIVED_RELATIONSHIP,
  SEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  UNFRIEND,
} from '../actionTypes';
import { FRIEND } from '../../utils/names';
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

    case ACCEPT_FRIEND_REQUEST: {
      return state.map((relationship) => {
        if (relationship.relationshipID === action.payload.relationshipID) {
          return { ...relationship, status: FRIEND };
        }
        return relationship;
      });
    }
    case UNFRIEND: {
      return state.filter((relationship) => relationship.relationshipID !== action.payload.docName);
    }

    default:
      return state;
  }
};

export default relationships;
