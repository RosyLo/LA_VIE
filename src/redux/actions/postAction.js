import { nanoid } from 'nanoid';
import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  RECIEVED_POSTS,
  TOGGLE_LIKE_POST,
  TOGGLE_Comment_Like,
  TOGGLE_POST_Comment_Like,
  RECIEVING_LOADING,
  RECEIVED_WELCOMEPOSTS,
} from '../actionTypes';
import uploadImage from '../../utils/imageUpload';
import { tagProcess } from '../../utils/tagProcess';
import firebase, { db } from '../../firebase';
import formatPost from '../../utils/formatPost';

export const fetchPosts = (lastVisible, lastSnap, setLastSnap) => (dispatch, getState) => {
  const { posts } = getState();
  if (lastVisible === 0) {
    const postsList = [];
    db.collection('Post')
      .orderBy('postTime', 'desc')
      //get 10 post at first fetch
      .limit(10)
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
          formatPost(postData);
          postsList.push(postData);
        });
        setLastSnap(snap.docs[9]);
      })
      .then(() => {
        dispatch({
          type: RECIEVED_POSTS,
          payload: { postsList },
        });
      })
      .then(() => {
        dispatch({ type: RECIEVING_LOADING, payload: false });
      });
  } else if (lastSnap) {
    let postsList = [...posts];
    db.collection('Post')
      .orderBy('postTime', 'desc')
      .startAfter(lastSnap)
      //get 10 post at the following fetch
      .limit(10)
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
          formatPost(postData);
          postsList.push(postData);
        });
        setLastSnap(snap.docs[snap.docs.length - 1]);
      })
      .then(() => {
        dispatch({
          type: RECIEVED_POSTS,
          payload: { postsList },
        });
      })
      .then(() => {
        dispatch({ type: RECIEVING_LOADING, payload: false });
      });
  }
};

export const addPost = (image, newMsg, newTag) => (dispatch, getState) => {
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
      postMessage: newMsg,
      postTag: {
        postID: '',
        label: newTag.label,
        value: newTag.value,
      },
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const ref = db.collection('Post');
    ref.add(post).then((docRef) => {
      post.postID = docRef.id;

      ref.doc(docRef.id).update({
        postID: docRef.id,
      });
      ref
        .doc(docRef.id)
        .get()
        .then((post) => {
          const postData = post.data();
          formatPost(postData);
          dispatch({ type: ADD_POST, payload: { post: postData } });
          dispatch(tagProcess(newTag, docRef.id));
        });
    });
  });
};

export const editPost = (editPostID, image, imageURL, newMsg, newTag, setIsUploadPopup) => (
  dispatch,
  getState,
) => {
  const { user } = getState();
  if (!user) return;
  let post = {};
  if (image === null) {
    post = {
      postID: editPostID,
      postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: imageURL },
      postIssuer: {
        postIssuerID: user.uid,
        postIssuerImage: user.photoURL,
        postIssuerName: user.displayName,
      },
      postMessage: newMsg,
      postTag: {
        postID: '',
        label: newTag.label,
        value: newTag.value,
      },
      postLikes: [],
    };
    const ref = db.collection('Post').doc(editPostID);
    ref
      .update(post)
      .then(() => {
        dispatch({ type: EDIT_POST, payload: { post } });
      })
      .then(() => {
        setIsUploadPopup(true);
      });
    dispatch(tagProcess(newTag, post.postID));
  } else {
    uploadImage(image, `Post/postImageLink${image.name}`, (downloadURL) => {
      post = {
        postID: editPostID,
        postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: downloadURL },
        postIssuer: {
          postIssuerID: user.uid,
          postIssuerImage: user.photoURL,
          postIssuerName: user.displayName,
        },
        postMessage: newMsg,
        postTag: newTag,
        postLikes: [],
      };
      const ref = db.collection('Post').doc(editPostID);
      ref.update(post).then(() => {
        dispatch({ type: EDIT_POST, payload: { post } });
        dispatch(tagProcess(newTag, post.postID));
        setIsUploadPopup(true);
      });
    });
  }
};

export const deletePost = (deletePost, setisDeletePopupClick) => (dispatch, getState) => {
  const postID = deletePost.postID;
  const ref = db.collection('Post');
  ref
    .doc(deletePost.postID)
    .delete()
    .then(() => {
      setisDeletePopupClick(false);
      dispatch({ type: DELETE_POST, payload: { postID } });
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
          dispatch({ type: TOGGLE_Comment_Like, payload: { id, likeIssuerID } });
          dispatch({ type: TOGGLE_POST_Comment_Like, payload: { id, likeIssuerID } });
        }
      });
  });
};

export const fetchMasterPosts = (paramsID) => (dispatch, getState) => {
  db.collection('Post')
    .orderBy('postTime', 'desc')
    .where('postIssuer.postIssuerID', '==', paramsID)
    .get()
    .then((snap) => {
      const postsList = [];
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
        formatPost(postData);
        postsList.push(postData);
      });
      return postsList;
    })
    .then((postsList) => {
      dispatch({
        type: RECIEVED_POSTS,
        payload: { postsList },
      });
    })
    .then(() => {
      dispatch({ type: RECIEVING_LOADING, payload: false });
    });
};

export const fetchWelcomePosts = () => (dispatch) => {
  const postsList = [];
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
        if (typeof postData.postTime !== 'string') {
          let date = postData.postTime.toDate();
          let shortTime = date.toDateString();
          postData.postTime = shortTime;
        }
        postsList.push(postData);
      });
      return postsList;
    })
    .then((postsList) => {
      dispatch({ type: RECEIVED_WELCOMEPOSTS, payload: postsList });
      dispatch({ type: RECIEVING_LOADING, payload: false });
    });
};
