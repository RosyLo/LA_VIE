import { RECIEVED_STORIES, ADD_STORY, DELETE_STORY, EDIT_STORY } from '../actionTypes';
import firebase, { db } from '../../firebase';

export const fetchStories = (paramsID) => (dispatch, getState) => {
  const { posts } = getState();
  const profileposts = posts.filter((post) => post.postIssuer.postIssuerID === paramsID);
  // 組合story state
  // 1.拿到此人的所有story
  // 2.組合 story 資訊，包含用post id去找post 資訊
  let story = [];
  db.collection('Story')
    .orderBy('createTime', 'desc')
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
      //delete state
      dispatch({ type: DELETE_STORY, payload: { deleteStory } });
    });
};

export const edtiStory = (story, setisStoryDeleteClick) => (dispatch, getState) => {
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
      return stateStory;
    })
    .then((stateStory) => {
      //set state
      dispatch({ type: EDIT_STORY, payload: { stateStory } });
    });
};
