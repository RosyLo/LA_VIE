import { nanoid } from 'nanoid';
import {
  RECIEVED_USER,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  RECIEVED_POSTS,
  TOGGLE_LIKE_POST,
  ADD_COMMENT,
  TOGGLE_Comment_Like,
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
      console.log(result);
      db.collection('User')
        .doc(user.uid)
        .set(
          {
            profileMessage: 'LA VIE',
            userName: user.displayName,
            userProfileImage: user.photoURL,
          },
          { merge: true },
        )
        .then(() => {
          localStorage.setItem('User', JSON.stringify(user));
          dispatch({ type: RECIEVED_USER, payload: { user } });
          window.location = '/main';
        });
    }
  });
};

export const logout = () => (dispatch) => {
  auth.signOut();
  localStorage.clear();
  dispatch({ type: RECIEVED_USER, payload: { user: null } });
  window.location = '/';
};

export const fetchPosts = () => (dispatch) => {
  const posts = [];
  db.collection('Post')
    .orderBy('postTime', 'desc')
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        const postData = {
          postID: post.id,
          postImage: post.data().postImage,
          postIssuer: post.data().postIssuer,
          postMessage: post.data().postMessage,
          postTag: post.data().postTag,
          postLikes: post.data().postLikes || [],
          postTime: post.data().postTime,
        };

        let date = postData.postTime.toDate();
        let shortTime = date.toDateString();
        console.log(shortTime);
        postData.postTime = shortTime;
        posts.push(postData);
      });
    })
    .then(() => {
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
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log(post);
    const ref = db.collection('Post');
    ref.add(post).then((docRef) => {
      post.postID = docRef.id;
      dispatch({ type: ADD_POST, payload: { post } });
      //寫postID 回firebase
      ref.doc(docRef.id).update({
        postID: docRef.id,
      });
    });
  });
};

export const editPost = (editPostID, image) => (dispatch, getState) => {
  const { user } = getState();

  if (!user) return;

  uploadImage(image, `Post/postImageLink${image.name}`, (downloadURL) => {
    const post = {
      postID: editPostID,
      postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: downloadURL },
      postIssuer: {
        postIssuerID: user.uid,
        postIssuerImage: user.photoURL,
        postIssuerName: user.displayName,
      },
      postMessage: 'rosy',
      postTag: 'rosy',
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const ref = db.collection('Post').doc(editPostID);
    ref.update(post).then(() => {
      console.log('update data successful');
      dispatch({ type: EDIT_POST, payload: { post } });
    });
  });
};

export const deletePost = (deletePost, setisDeletePopupClick) => (dispatch, getState) => {
  console.log(deletePost);
  const postID = deletePost.postID;
  const { posts } = getState();
  const ref = db.collection('Post');
  ref
    .doc(deletePost.postID)
    .delete()
    .then(() => {
      setisDeletePopupClick(false);
      dispatch({ type: DELETE_POST, payload: { postID } });
    })
    .then(() => {
      console.log('last');
    });
};

export const togglePostLike = (id, isfrom) => (dispatch, getState) => {
  const { user } = getState();

  if (!user) return;

  let ref = {};
  let set = '';
  let type = '';

  if (isfrom === 'post') {
    ref = db.collection('Post').doc(id);
    set = 'postLikes';
    type = TOGGLE_LIKE_POST;
  } else if (isfrom === 'comment') {
    ref = db.collection('Comment').doc(id);
    set = 'likeIssuerID';
    type = TOGGLE_Comment_Like;
    console.log('comment');
  }

  let likeSet = {};
  return db.runTransaction((transaction) => {
    return transaction
      .get(ref)
      .then((postDoc) => {
        if (postDoc.exists) {
          return postDoc;
        } else return;
      })
      .then((postDoc) => {
        likeSet = new Set(postDoc.data()[set]);
        if (likeSet.has(user.uid)) {
          likeSet.delete(user.uid);
        } else {
          likeSet.add(user.uid);
        }
      })
      .then(() => {
        if (isfrom === 'post') {
          let postLikes = Array.from(likeSet);
          transaction.update(ref, { postLikes });
          dispatch({ type: type, payload: { id, postLikes } });
        } else if (isfrom === 'comment') {
          let likeIssuerID = Array.from(likeSet);
          transaction.update(ref, { likeIssuerID });
          dispatch({ type: type, payload: { id, likeIssuerID } });
        }
        console.log('none');
      })
      .then((type) => {
        console.log('toggle heart success');
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
    likeIssuerID: [],
    postID: postID,
    commentID: '',
    commentTime: firebase.firestore.FieldValue.serverTimestamp(),
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
