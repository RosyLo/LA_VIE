import { nanoid } from 'nanoid';
import {
  RECIEVED_USER,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  RECIEVED_POSTS,
  TOGGLE_LIKE_POST,
  RECEIVED_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  ADD_POST_COMMENT,
  EDIT_POST_COMMENT,
  DELETE_POST_COMMENT,
  TOGGLE_Comment_Like,
  TOGGLE_POST_Comment_Like,
  RECIEVED_TAGS,
  RECIEVED_STORIES,
  RECIEVED_MASTERPOSTS,
  ADD_STORY,
  DELETE_STORY,
  EDIT_STORY,
  RECIEVING_LOADING,
} from './actionTypes';
import uploadImage from '../utils/imageUpload';
import { tagProcess } from './callbackActions';
import firebase from '../firebase';

const db = firebase.firestore();
const auth = firebase.auth();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const login = (setLoginPopup, setisPostClick) => (dispatch) => {
  auth.signInWithPopup(facebookAuthProvider).then(async (result) => {
    setLoginPopup(false);
    if (setisPostClick) {
      setisPostClick(false);
    }
    if (result) {
      const { user } = result;
      console.log(user);
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
          window.location = '/main';
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
  window.location = '/welcome';
};

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const loginGoogle = (setLoginPopup, setisPostClick) => (dispatch) => {
  auth.signInWithPopup(googleAuthProvider).then(async (result) => {
    setLoginPopup(false);
    if (setisPostClick) {
      setisPostClick(false);
    }
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
          window.location = '/main';
        });
    }
  });
};

export const fetchPosts = (lastVisible, lastSnap, setLastSnap) => (dispatch, getState) => {
  const { posts } = getState();
  if (lastVisible === 0) {
    console.log('last visible equal zero!');
    const postsList = [];
    db.collection('Post')
      .orderBy('postTime', 'desc')
      //初始拿到10筆
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
          if (typeof postData.postTime !== 'string') {
            let date = postData.postTime.toDate();
            let shortTime = date.toDateString();
            postData.postTime = shortTime;
          }
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
    console.log('else start, the last visible is', lastVisible);
    let postsList = [...posts];
    db.collection('Post')
      .orderBy('postTime', 'desc')
      .startAfter(lastSnap)
      //後面拿2筆
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
          if (typeof postData.postTime !== 'string') {
            let date = postData.postTime.toDate();
            let shortTime = date.toDateString();
            postData.postTime = shortTime;
          }
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

      //寫postID 回firebase
      ref.doc(docRef.id).update({
        postID: docRef.id,
      });
      //add post state
      dispatch({ type: ADD_POST, payload: { post } });
      //tag
      dispatch(tagProcess(newTag, post.postID));
    });
  });
};

export const editPost = (
  editPostID,
  image,
  imageURL,
  newMsg,
  newTag,
  postTime,
  setIsUploadPopup,
) => (dispatch, getState) => {
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
      postTime: postTime,
    };
    console.log(post);
    const ref = db.collection('Post').doc(editPostID);
    ref
      .update(post)
      .then(() => {
        console.log('update data successful');
        dispatch({ type: EDIT_POST, payload: { post } });
      })
      .then(() => {
        console.log(setIsUploadPopup);
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
        postTime: postTime,
      };
      const ref = db.collection('Post').doc(editPostID);
      ref
        .update(post)
        .then(() => {
          console.log('update data successful');
          dispatch({ type: EDIT_POST, payload: { post } });
        })
        .then(() => {
          dispatch(tagProcess(newTag, post.postID));
        })
        .then(() => {
          console.log(setIsUploadPopup);
          setIsUploadPopup(true);
        });
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
  console.log(id);
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
    console.log('comment');
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
        console.log(id);
        if (isfrom === 'post') {
          let postLikes = Array.from(likeSet);
          transaction.update(ref, { postLikes });
          dispatch({ type: type, payload: { id, postLikes } });
        } else if (isfrom === 'comment') {
          let likeIssuerID = Array.from(likeSet);
          transaction.update(ref, { likeIssuerID });
          console.log(likeIssuerID);
          console.log(type);
          dispatch({ type: TOGGLE_Comment_Like, payload: { id, likeIssuerID } });
          dispatch({ type: TOGGLE_POST_Comment_Like, payload: { id, likeIssuerID } });
        }
      })
      .then((type) => {
        console.log('toggle heart success');
      });
  });
};

export const fetchComments = (clickPostID, postID, lastSnap, setLastSnap, lastVisible) => (
  dispatch,
  getState,
) => {
  const { comments } = getState();
  console.log(comments);
  let queryOpen = false;
  if (lastVisible === 0) {
    let commentsList = [];
    console.log(commentsList);
    db.collection('Comment')
      .orderBy('commentTime', 'desc')
      .limit(10)
      .where('postID', '==', clickPostID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commentsList.push(doc.data());
        });
        // setPostComments(commentsList);
        setLastSnap(querySnapshot.docs[9]);
        queryOpen = true;
      })
      .then(() => {
        console.log(commentsList);
        dispatch({ type: RECEIVED_COMMENT, payload: { commentsList } });
      });
  } else if (lastSnap) {
    let commentsList = [...comments];
    console.log(commentsList);
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
        // setPostComments(commentsList);
        console.log(commentsList);
        setLastSnap(querySnapshot.docs[querySnapshot.docs.length - 1]);
      })
      .then(() => {
        console.log(commentsList);
        dispatch({ type: RECEIVED_COMMENT, payload: { commentsList } });
      });
  }
};

export const addComment = (postID, newComment) => (dispatch, getState) => {
  console.log('ADD_POST_COMMENTS');
  console.log(newComment);
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
    console.log('ADD_POST_COMMENTS');
    //寫commentID 回firebase
    ref.doc(docRef.id).update({
      commentID: docRef.id,
    });
  });
};

export const editComment = (comment, commentContent) => (dispatch, getState) => {
  console.log(commentContent);
  let editedComment = [];

  let editedPostComment = [];
  const ref = db.collection('Comment').doc(comment.commentID);
  ref
    .update({
      commentIssuerMessage: commentContent,
    })
    .then(() => {
      //撈出有編輯的那筆，改那筆
      const { comments } = getState();
      const { postcomments } = getState();
      console.log(comments);
      console.log(postcomments);
      // comments.forEach((postComment) => {
      //   console.log(postComment);
      //   console.log(comment);
      //   if (postComment.commentID === comment.commentID) {
      //     postComment.commentIssuerMessage = commentContent;
      //     return postComment;
      //   }
      //   console.log(postComment);
      //   editedComment.push(postComment);
      // });

      postcomments.forEach((postComment) => {
        let newPostComment = { ...postComment };
        if (postComment.commentID === comment.commentID) {
          newPostComment.commentIssuerMessage = commentContent;
          // postComment.commentIssuerMessage = commentContent;
        }
        // let newPostComment = { ...postComment };
        editedPostComment.push(newPostComment);
      });

      dispatch({
        type: EDIT_POST_COMMENT,
        payload: { editedPostComment },
      });
    });
  // .then(() => {
  //   console.log(editedComment);
  //   dispatch({
  //     type: EDIT_COMMENT,
  //     payload: { editedComment },
  //   });
  //   console.log(editedPostComment);
  //   dispatch({
  //     type: EDIT_POST_COMMENT,
  //     payload: { editedPostComment },
  //   });
  // });
};
export const deleteComment = (comment, setPostComments, postComments) => (dispatch, getState) => {
  const { comments } = getState();
  const { postcomments } = getState();
  let newComments = comments.filter((postComment) => postComment.commentID !== comment.commentID);
  console.log(newComments);

  let newPostComments = postcomments.filter(
    (postComment) => postComment.commentID !== comment.commentID,
  );
  // setPostComments(newComments);
  dispatch({
    type: DELETE_COMMENT,
    payload: { newComments },
  });
  dispatch({
    type: DELETE_POST_COMMENT,
    payload: { newPostComments },
  });

  const db = firebase.firestore();
  const ref = db.collection('Comment').doc(comment.commentID);
  ref.delete().then(() => {
    console.log('delete data successful');
  });
};

export const fetchMasterPosts = (paramsID) => (dispatch, getState) => {
  //1.先拉下所有posts
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
      dispatch({
        type: RECIEVED_POSTS,
        payload: { postsList },
      });
    })
    .then(() => {
      dispatch({ type: RECIEVING_LOADING, payload: false });
    })
    .catch((error) => console.log(error));
  // .then(() => {
  //   //2.再判斷是否為此人的posts
  //   let masterPosts = [];
  //   const { posts } = getState();
  //   posts.forEach((post) => {
  //     if (post.postIssuer.postIssuerID === paramsID) {
  //       masterPosts.push(post);
  //     }
  //   });
  //   return masterPosts;
  // });
  // //3.若是，dispatch 到masterposts，給ProfileContent用
  // .then((masterPosts) => {
  //   dispatch({ type: RECIEVED_MASTERPOSTS, payload: { masterPosts } });
  // });
};

// export const fetchMasterPosts = (paramsID) => (dispatch, getState) => {
//   const { posts } = getState();
//   //
//   const postsList = [];
//   let masterPosts = [];
//   db.collection('Post')
//     .orderBy('postTime', 'desc')
//     .get()
//     .then((snap) => {
//       snap.forEach((post) => {
//         const postData = {
//           postID: post.id,
//           postImage: post.data().postImage,
//           postIssuer: post.data().postIssuer,
//           postMessage: post.data().postMessage,
//           postTag: post.data().postTag,
//           postLikes: post.data().postLikes || [],
//           postTime: post.data().postTime,
//         };
//         if (typeof postData.postTime !== 'string') {
//           let date = postData.postTime.toDate();
//           let shortTime = date.toDateString();
//           postData.postTime = shortTime;
//         }
//         // console.log(postData);
//         postsList.push(postData);
//       });
//     })
//     .then(() => {
//       console.log(postsList);
//       //
//       postsList.map((post) => {
//         if (post.postIssuer.postIssuerID === paramsID) {
//           masterPosts.push(post);
//         }
//       });
//     })
//     .then(() => {
//       console.log(masterPosts);
//       dispatch({ type: RECIEVED_MASTERPOSTS, payload: { masterPosts } });
//     });
// };

export const fetchStories = (paramsID) => (dispatch, getState) => {
  const { posts } = getState();
  console.log(posts);
  const profileposts = posts.filter((post) => post.postIssuer.postIssuerID === paramsID);
  console.log(profileposts);
  console.log(paramsID);
  // 組合story state
  // 1.拿到此人的所有story
  // 2.組合 story 資訊，包含用post id去找post 資訊
  let story = [];
  db.collection('Story')
    .where('storyIssuerID', '==', paramsID)
    .orderBy('createTime', 'desc')
    .get()
    .then((snap) => {
      console.log(snap);
      snap.forEach((doc) => {
        let storyData = {
          storyID: doc.data().storyID,
          storyName: doc.data().storyName,
          storyImageLink: doc.data().storyImageLink,
          storyIssuerID: doc.data().storyIssuerID,
          createTime: doc.data().createTime,
        };
        console.log('hi');
        let stories = doc.data().stories.map((storiesID) => {
          return profileposts.find((profilepost) => profilepost.postID === storiesID);
        });
        storyData.stories = stories;
        story.push(storyData);
      });
      console.log(story);
    })
    .then(() => {
      console.log(story);
      dispatch({
        type: RECIEVED_STORIES,
        payload: { story },
      });
    })
    .catch((error) => console.log(error));
};

export const addStory = (addedstory) => (dispatch, getState) => {
  const { user } = getState();
  const { posts } = getState();
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
        posts.map((masterPost) => {
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
  const { posts } = getState();
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
        posts.map((masterPost) => {
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
