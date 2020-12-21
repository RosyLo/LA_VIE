import { ADD_COMMENT, TOGGLE_Comment_Like } from '../actionTypes';

const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      console.log(action.payload.comment);
      return [...state, action.payload.comment];
    }
    case TOGGLE_Comment_Like: {
      return state.map((comment) => {
        console.log(comment);
        if (comment.commentID === action.payload.id) {
          return { ...comment, likeIssuerID: action.payload.likeIssuerID };
        }
        console.log(comment);
        return comment;
      });
    }
    default:
      return state;
  }
};

export default comments;
