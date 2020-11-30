import { nanoid } from 'nanoid';
import {
  RECIEVED_USER,
  ADD_POST,
  RECIEVED_POSTS,
  TOGGLE_LIKE_POST,
  ADD_COMMENT,
} from './actionTypes';
import uploadImage from '../utils/imageUpload';
import firebase from '../firebase';

const db = firebase.firestore();
const auth = firebase.auth();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const login = () => (dispatch) => {
  auth.signInWithPopup(facebookAuthProvider).then(async (result) => {
    if (result) {
      const { user } = result;
      //const user =result.user
      db.collection('User')
        .doc(user.uid)
        .set(
          {
            profileMessage: 'test',
            userName: user.displayName,
          },
          { merge: true },
        )
        .then(() => {
          localStorage.setItem('User', JSON.stringify(user));
          dispatch({ type: RECIEVED_USER, payload: { user } });
        });
    }
  });
};

export const logout = () => (dispatch) => {
  auth.signOut();
  localStorage.clear();
  dispatch({ type: RECIEVED_USER, payload: { user: null } });
};

export const fetchPosts = () => (dispatch) => {
  const posts = [];
  db.collection('Post')
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        const postData = {
          postID: post.id,
          postImage: post.data().postImage,
          postIssuer: post.data().postIssuer,
          postMessage: post.data().postMessage,
          postTag: post.data().postTag,
          postLikeIssuerId: post.data().postLikeIssuerId,
          postLikes: post.data().postLikes || [],
        };
        posts.push(postData);
      });

      dispatch({
        type: RECIEVED_POSTS,
        payload: { posts },
      });
    });
};

export const addPost = (image) => (dispatch, getState) => {
  const { user } = getState();

  if (!user) return;

  uploadImage(image, `Post/postImageLink${image.name}`, (downloadURL) => {
    const post = {
      postID: '',
      postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: downloadURL },
      postIssuer: {
        postIssuerID: user.uid,
        postIssuerImage: user.photoURL,
        postIssuerName: user.displayName,
      },
      postMessage: 'rosy',
      postTag: 'rosy',
      postLikeIssuerId: [],
      postLikes: [],
    };
    const ref = db.collection('Post');
    ref.add(post).then((docRef) => {
      post.postID = docRef.id;
      dispatch({ type: ADD_POST, payload: { post } });
      //寫commentID 回firebase
      ref.doc(docRef.id).update({
        postID: docRef.id,
      });
    });
  });
};

// export const deletePost =(postID)=>(dispatch, getState)=>{

// };

export const togglePostLike = (postID) => (dispatch, getState) => {
  const { user } = getState();

  if (!user) return;

  const postRef = db.collection('Post').doc(postID);

  return db.runTransaction((transaction) => {
    return transaction.get(postRef).then((postDoc) => {
      if (postDoc.exists) {
        const postLikeSet = new Set(postDoc.data().postLikes);
        if (postLikeSet.has(user.uid)) {
          postLikeSet.delete(user.uid);
        } else {
          postLikeSet.add(user.uid);
        }

        const postLikes = Array.from(postLikeSet);
        transaction.update(postRef, { postLikes });

        dispatch({ type: TOGGLE_LIKE_POST, payload: { postID, postLikes } });
      }
    });
  });
};

export const addComment = (postID, newComment) => (dispatch, getState) => {
  const { user } = getState();
  if (!user) return;
  const comment = {
    postIssuer: {
      postIssuerID: user.uid,
      postIssuerImage: user.photoURL,
      postIssuerName: user.displayName,
    },
    commentIssuerMessage: newComment,
    likeIssuerId: [],
    postID: postID,
    commentID: '',
  };
  const ref = db.collection('Comment');
  ref.add(comment).then((docRef) => {
    console.log(docRef.id);
    comment.commentID = docRef.id;
    dispatch({ type: ADD_COMMENT, payload: { comment } });
    //寫commentID 回firebase
    ref.doc(docRef.id).update({
      commentID: docRef.id,
    });
  });
};
