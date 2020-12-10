import { nanoid } from 'nanoid';
import { UPDATE_TAG, ADD_TAG } from './actionTypes';
import firebase from '../firebase';

const db = firebase.firestore();
export const tagProcess = (newTag, tagpostID) => (dispatch, getState) => {
  const { tags } = getState();
  const ref = db.collection('Tag').doc(newTag.value);
  //tag array
  let tagID = [];
  tags.map((tag) => {
    tagID.push(tag.value);
  });

  //如果有該tag了，新增tag的postID array
  if (tagID.includes(newTag.value)) {
    let updateTag = tags.find((tag) => tag.value === newTag.value);
    let updateTagpostID = updateTag.postID;
    updateTagpostID.push(tagpostID);

    dispatch({
      type: UPDATE_TAG,
      payload: { tags },
    });
    //更新 firebase postID array
    const ref = db.collection('Tag').doc(newTag.value);
    ref.update({
      postID: updateTagpostID,
    });
  } else {
    //如果沒有該tag，新增新的state data 進tag state
    const tagData = {
      postID: [tagpostID],
      label: newTag.label,
      value: newTag.value,
    };

    dispatch({
      type: ADD_TAG,
      payload: { tagData },
    });

    //新增新的文件，文件名是tagValue
    const ref = db.collection('Tag').doc(newTag.value);
    ref.set(tagData).then(() => {});
  }
};
