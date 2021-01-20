import {
  RECEIVED_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST_COMMENT,
  EDIT_POST_COMMENT,
  DELETE_POST_COMMENT,
  RECIEVING_LOADING,
} from '../actionTypes';
import firebase, { db } from '../../firebase';

export const fetchComments = (clickPostID, lastSnap, setLastSnap, lastVisible) => (
  dispatch,
  getState,
) => {
  const { comments } = getState();
  let queryOpen = false;
  if (lastVisible === 0) {
    let commentsList = [];
    db.collection('Comment')
      .orderBy('commentTime', 'desc')
      .limit(10)
      .where('postID', '==', clickPostID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentsList.push(doc.data());
        });
        setLastSnap(querySnapshot.docs[9]);
        queryOpen = true;
      })
      .then(() => {
        dispatch({ type: RECEIVED_COMMENT, payload: { commentsList } });
        dispatch({ type: RECIEVING_LOADING, payload: false });
      });
  } else if (lastSnap) {
    let commentsList = [...comments];
    db.collection('Comment')
      .orderBy('commentTime', 'desc')
      .startAfter(lastSnap)
      .limit(5)
      .where('postID', '==', clickPostID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentsList.push(doc.data());
        });
        setLastSnap(querySnapshot.docs[querySnapshot.docs.length - 1]);
      })
      .then(() => {
        dispatch({ type: RECEIVED_COMMENT, payload: { commentsList } });
        dispatch({ type: RECIEVING_LOADING, payload: false });
      });
  }
};

export const addComment = (postID, newComment) => (dispatch, getState) => {
  if (!newComment) return;
  const { user } = getState();
  if (!user) return;
  const comment = {
    commentIssuer: {
      commentIssuerID: user.uid,
      commentIssuerImage: user.photoURL,
      commentIssuerName: user.displayName,
    },
    commentIssuerMessage: newComment,
    likeIssuerID: [],
    postID: postID,
    commentID: '',
    commentTime: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const ref = db.collection('Comment');
  ref.add(comment).then((docRef) => {
    comment.commentID = docRef.id;
    dispatch({ type: ADD_POST_COMMENT, payload: { comment } });
    dispatch({ type: ADD_COMMENT, payload: { comment } });
    //寫commentID 回firebase
    ref.doc(docRef.id).update({
      commentID: docRef.id,
    });
  });
};

export const editComment = (comment, commentContent) => (dispatch, getState) => {
  let editedPostComment = [];
  const ref = db.collection('Comment').doc(comment.commentID);
  ref
    .update({
      commentIssuerMessage: commentContent,
    })
    .then(() => {
      //撈出有編輯的那筆，改那筆
      const { postcomments } = getState();
      postcomments.forEach((postComment) => {
        let newPostComment = { ...postComment };
        if (postComment.commentID === comment.commentID) {
          newPostComment.commentIssuerMessage = commentContent;
        }
        editedPostComment.push(newPostComment);
      });

      dispatch({
        type: EDIT_POST_COMMENT,
        payload: { editedPostComment },
      });
    });
};
export const deleteComment = (comment, setPostComments, postComments) => (dispatch, getState) => {
  const { comments } = getState();
  const { postcomments } = getState();
  let newComments = comments.filter((postComment) => postComment.commentID !== comment.commentID);

  let newPostComments = postcomments.filter(
    (postComment) => postComment.commentID !== comment.commentID,
  );
  dispatch({
    type: DELETE_COMMENT,
    payload: { newComments },
  });
  dispatch({
    type: DELETE_POST_COMMENT,
    payload: { newPostComments },
  });

  const ref = db.collection('Comment').doc(comment.commentID);
  ref.delete().then(() => {
    console.log('delete data successful');
  });
};
