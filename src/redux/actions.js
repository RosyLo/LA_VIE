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
  RECIEVED_TAGS,
  RECIEVED_STORIES,
  RECIEVED_MASTERPOSTS,
} from './actionTypes';
import uploadImage from '../utils/imageUpload';
import { tagProcess } from './callbackActions';
import firebase from '../firebase';

const db = firebase.firestore();
const auth = firebase.auth();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const login = () => (dispatch) => {
  auth.signInWithPopup(facebookAuthProvider).then(async (result) => {
    if (result) {
      // result.user.photoURL += '?width=700';
      // console.log(result.user.photoURL);
      const { user } = result;
      console.log(user.photoURL);
      let url = user.photoURL;
      url += '?width=700';
      db.collection('User')
        .doc(user.uid)
        .set(
          {
            profileMessage: 'LA VIE',
            userName: user.displayName,
            userProfileImage: url,
          },
          { merge: true },
        )
        .then(() => {
          localStorage.setItem('User', JSON.stringify(user));
          dispatch({ type: RECIEVED_USER, payload: { user } });
          // window.location = '/main';
        });
    }
  });
};

export const logout = () => (dispatch) => {
  auth.signOut();
  localStorage.clear();
  dispatch({ type: RECIEVED_USER, payload: { user: null } });
  window.location = '/welcome';
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

export const receiveTags = () => (dispatch) => {
  const tags = [];
  db.collection('Tag')
    .get()
    .then((snap) => {
      snap.forEach((tag) => {
        const tagData = {
          postID: tag.data().postID,
          label: tag.data().label,
          value: tag.data().value,
        };
        tags.push(tagData);
      });
    })
    .then(() => {
      dispatch({
        type: RECIEVED_TAGS,
        payload: { tags },
      });
    });
};

export const addPost = (image, newMsg, newTag) => (dispatch, getState) => {
  const { tags } = getState();

  const { user } = getState();

  if (!user) return;
  let forTagPostID = '';
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
      postTag: newTag.value,
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const ref = db.collection('Post');
    ref.add(post).then((docRef) => {
      post.postID = docRef.id;
      dispatch({ type: ADD_POST, payload: { post } });
      //寫postID 回firebase
      ref.doc(docRef.id).update({
        postID: docRef.id,
      });
      //  tag
      dispatch(tagProcess(newTag, post.postID));
    });
  });
};

export const editPost = (editPostID, image, newMsg, newTag) => (dispatch, getState) => {
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
      postMessage: newMsg,
      postTag: newTag.value,
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const ref = db.collection('Post').doc(editPostID);
    ref.update(post).then(() => {
      console.log('update data successful');
      dispatch({ type: EDIT_POST, payload: { post } });
    });
    dispatch(tagProcess(newTag, post.postID));
  });
};

export const deletePost = (deletePost, setisDeletePopupClick) => (dispatch, getState) => {
  const postID = deletePost.postID;
  const { posts } = getState();
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
          dispatch({ type: type, payload: { id, likeIssuerID } });
        }
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
    comment.commentID = docRef.id;
    dispatch({ type: ADD_COMMENT, payload: { comment } });
    //寫commentID 回firebase
    ref.doc(docRef.id).update({
      commentID: docRef.id,
    });
  });
};

export const fetchMasterPosts = (paramsID) => (dispatch, getState) => {
  const { posts } = getState();
  let masterPosts = [];
  posts.map((post) => {
    if (post.postIssuer.postIssuerID === paramsID) {
      masterPosts.push(post);
    }
  });
  dispatch({ type: RECIEVED_MASTERPOSTS, payload: { masterPosts } });
};

export const fetchStories = (paramsID) => (dispatch, getState) => {
  const { masterposts } = getState();
  const profileposts = masterposts.filter((post) => post.postIssuer.postIssuerID === paramsID);
  // 組合story state
  // 1.拿到此人的所有story
  // 2.組合 story 資訊，包含用post id去找post 資訊
  let story = [];
  db.collection('Story')
    .where('storyIssuerID', '==', paramsID)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        let storyData = {
          storyID: doc.data().storyID,
          storyName: doc.data().storyName,
          storyImageLink: doc.data().storyImageLink,
          storyIssuerID: doc.data().storyIssuerID,
          createTime: doc.data().createTime,
        };
        let stories = doc.data().stories.map((storiesID) => {
          return profileposts.find((profilepost) => profilepost.postID === storiesID);
        });
        storyData.stories = stories;
        story.push(storyData);
      });
    })
    .then(() => {
      dispatch({
        type: RECIEVED_STORIES,
        payload: { story },
      });
    });
};
