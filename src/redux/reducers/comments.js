import {
  RECEIVED_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_Comment_Like,
} from '../actionTypes';

//comments: 該post popup 的comments 們（10,5），若有別篇的add，一樣加進來，在各compo render 時再判斷是哪篇post的
const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_COMMENT: {
      let newComments = [...state];
      newComments = action.payload.commentsList;
      return newComments;
    }
    // 不管來自哪篇。都加進comments
    case ADD_COMMENT: {
      return [action.payload.comment, ...state];
    }
    case EDIT_COMMENT: {
      let newComments = [...state];
      newComments = action.payload.editedComment;
      return newComments;
    }
    case DELETE_COMMENT: {
      return action.payload.newComments;
    }
    case TOGGLE_Comment_Like: {
      return state.map((comment) => {
        if (comment.commentID === action.payload.id) {
          return { ...comment, likeIssuerID: action.payload.likeIssuerID };
        }
        return comment;
      });
    }
    default:
      return state;
  }
};

export default comments;
