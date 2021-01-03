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
        console.log(relationship);
        console.log(action.payload.relationship);
        if (relationship.relationshipID === action.payload.relationship.relationshipID) {
          console.log(relationship);
          return { ...relationship, status: FRIEND };
        }
        console.log(relationship);
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
