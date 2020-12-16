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
  ADD_STORY,
  DELETE_STORY,
  EDIT_STORY,
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
      const { user } = result;
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
        if (typeof postData.postTime !== 'string') {
          let date = postData.postTime.toDate();
          let shortTime = date.toDateString();
          postData.postTime = shortTime;
          posts.push(postData);
        }
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
      postTag: newTag,
      postLikes: [],
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const ref = db.collection('Post');
    console.log(post);
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

export const editPost = (editPostID, image, imageURL, newMsg, newTag, postTime) => (
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
      postTag: newTag,
      postLikes: [],
      postTime: postTime,
    };
    console.log(post);
    const ref = db.collection('Post').doc(editPostID);
    ref.update(post).then(() => {
      console.log('update data successful');
      dispatch({ type: EDIT_POST, payload: { post } });
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
        postTime: postTime,
      };
      console.log(post);
      const ref = db.collection('Post').doc(editPostID);
      ref.update(post).then(() => {
        console.log('update data successful');
        dispatch({ type: EDIT_POST, payload: { post } });
      });
      dispatch(tagProcess(newTag, post.postID));
    });
  }
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
    dispatch({ type: ADD_COMMENT, payload: { comment } });
    //寫commentID 回firebase
    ref.doc(docRef.id).update({
      commentID: docRef.id,
    });
  });
};

export const editComment = (comment, commentContent) => (dispatch, getState) => {
  const ref = db.collection('Comment').doc(comment.commentID);
  ref
    .update({
      commentIssuerMessage: commentContent,
    })
    .then(() => {
      console.log('update data successful');
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

export const addStory = (addedstory) => (dispatch, getState) => {
  const { user } = getState();
  const { masterposts } = getState();
  const story = {
    storyID: '',
    storyName: addedstory.storyName,
    storyImageLink: addedstory.storyImageLink,
    storyIssuerID: user.uid,
    createTime: firebase.firestore.FieldValue.serverTimestamp(),
    stories: addedstory.stories,
  };
  const ref = db.collection('Story');
  ref
    .add(story)
    .then((docRef) => {
      story.storyID = docRef.id;
      ref.doc(docRef.id).update({
        storyID: docRef.id,
      });
      let stateStory = story;
      let stateStoryStories = [];
      stateStory.stories.map((postID) => {
        masterposts.map((masterPost) => {
          if (masterPost.postID === postID) {
            stateStoryStories.push(masterPost);
          }
        });
      });
      stateStory.stories = stateStoryStories;
      return stateStory;
    })
    .then((stateStory) => {
      console.log(stateStory);
      dispatch({ type: ADD_STORY, payload: { stateStory } });
    });
};

export const deleteStory = (deleteStory, setisStoryDeleteClick) => (dispatch, getState) => {
  //delete db
  const storyID = deleteStory.storyID;
  const ref = db.collection('Story');

  ref
    .doc(storyID)
    .delete()
    .then(() => {
      setisStoryDeleteClick(false);
    })
    .then(() => {
      console.log(deleteStory);
      //delete state
      dispatch({ type: DELETE_STORY, payload: { deleteStory } });
    });
};

export const edtiStory = (story, setisStoryDeleteClick) => (dispatch, getState) => {
  console.log(story);
  const { user } = getState();
  const { masterposts } = getState();
  if (!user) return;
  //set db
  const ref = db.collection('Story').doc(story.storyID);
  ref
    .update(story)
    .then(() => {
      console.log('update data successful');
      let stateStory = story;
      let stateStoryStories = [];
      stateStory.stories.map((postID) => {
        masterposts.map((masterPost) => {
          if (masterPost.postID === postID) {
            stateStoryStories.push(masterPost);
          }
        });
      });
      stateStory.stories = stateStoryStories;
      console.log(stateStory);
      return stateStory;
    })
    .then((stateStory) => {
      //set state
      dispatch({ type: EDIT_STORY, payload: { stateStory } });
    });
};

// export const editPost = (editPostID, image, imageURL, newMsg, newTag, postTime) => (
//   dispatch,
//   getState,
// ) => {
//   const { user } = getState();

//   if (!user) return;
//   let post = {};
//   if (image === null) {
//     post = {
//       postID: editPostID,
//       postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: imageURL },
//       postIssuer: {
//         postIssuerID: user.uid,
//         postIssuerImage: user.photoURL,
//         postIssuerName: user.displayName,
//       },
//       postMessage: newMsg,
//       postTag: newTag,
//       postLikes: [],
//       postTime: postTime,
//     };
//     console.log(post);
//     const ref = db.collection('Post').doc(editPostID);
//     ref.update(post).then(() => {
//       console.log('update data successful');
//       dispatch({ type: EDIT_POST, payload: { post } });
//     });
//     dispatch(tagProcess(newTag, post.postID));
//   } else {
//     uploadImage(image, `Post/postImageLink${image.name}`, (downloadURL) => {
//       post = {
//         postID: editPostID,
//         postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: downloadURL },
//         postIssuer: {
//           postIssuerID: user.uid,
//           postIssuerImage: user.photoURL,
//           postIssuerName: user.displayName,
//         },
//         postMessage: newMsg,
//         postTag: newTag,
//         postLikes: [],
//         postTime: postTime,
//       };
//       console.log(post);
//       const ref = db.collection('Post').doc(editPostID);
//       ref.update(post).then(() => {
//         console.log('update data successful');
//         dispatch({ type: EDIT_POST, payload: { post } });
//       });
//       dispatch(tagProcess(newTag, post.postID));
//     });
//   }
// };
