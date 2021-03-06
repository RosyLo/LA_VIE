import {
  ADD_POST_COMMENT,
  EDIT_POST_COMMENT,
  DELETE_POST_COMMENT,
  TOGGLE_POST_Comment_Like,
} from '../actionTypes';

//comments: 該post popup 的comments 們（10,5），若有別篇的add，一樣加進來，在各compo render 時再判斷是哪篇post的
const postcomments = (state = [], action) => {
  switch (action.type) {
    case ADD_POST_COMMENT: {
      return [...state, action.payload.comment];
    }

    case EDIT_POST_COMMENT: {
      let newComments = [...state];
      newComments = action.payload.editedPostComment;
      return newComments;
    }
    case DELETE_POST_COMMENT: {
      return action.payload.newPostComments;
    }
    case TOGGLE_POST_Comment_Like: {
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

export default postcomments;
