import { generatePath } from 'react-router';
import { useSelector } from 'react-redux';
import { RECEIVED_RELATIONSHIP, SEND_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST } from '../actionTypes';
import { db } from '../../firebase';
import { UNFRIEND, FRIEND, fromProfile, fromMasterProfile } from '../../utils/names';

//state: 以使用者的角色
//db 上的state : friend,requesting
//local state: friend, requesting, requested,null

export const getProfileRelationShip = (paramsID) => (dispatch, getState) => {
  const { user } = getState();
  console.log(paramsID);
  const relationships = [];
  //get profile request friends list
  db.collection('RelationShip')
    .where('requester.uid', '==', paramsID)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        relationships.push(doc.data());
      });
      //get profile friends request list
      db.collection('RelationShip')
        .where('requestee.uid', '==', paramsID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            relationships.push(doc.data());
          });
          dispatch({ type: RECEIVED_RELATIONSHIP, payload: { relationships } });
        });
    });
};

export const sendFriendRequest = () => (dispatch, getState) => {
  const { user } = getState();
  const { profile } = getState();
  const relationship = {
    requester: {
      uid: user.uid,
      userName: user.displayName,
      userProfileImage: user.photoURL,
    },
    requestee: {
      uid: profile.uid,
      userName: profile.userName,
      userProfileImage: profile.userProfileImage,
    },
    status: REQUESTING,
    relationshipID: `${user.uid}-${profile.uid}`,
  };

  // //更新db
  db.collection('RelationShip')
    .doc(`${user.uid}-${profile.uid}`)
    .set(relationship)
    .then(() => {
      console.log('send request successful');
      relationship.relationshipID = `${user.uid}-${profile.uid}`;
      //＋relationship
      dispatch({ type: SEND_FRIEND_REQUEST, payload: { relationship } });
    });
};

export const acceptFriendRequest = (relationship) => (dispatch, getState) => {
  const { user } = getState();
  const { profile } = getState();
  console.log(relationship);

  // db:找到該relationship, 改status
  db.collection('RelationShip')
    .doc(relationship.relationshipID)
    .update({
      status: FRIEND,
    })
    .then(() => {
      console.log('update request successful');
      console.log(relationship);
      //找到該relationship，改status
      dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: { relationship } });
    });
};

export const unFriend = (friend, isFrom) => (dispatch, getState) => {
  const { user } = getState();
  const { profile } = getState();
  let docName;
  if (isFrom === fromProfile) {
    docName = friend.uid;
    db.collection('RelationShip')
      .doc(docName)
      .delete()
      .then(() => {
        console.log('delete request successful');
        //找到該relationship，刪除
        dispatch({ type: UNFRIEND, payload: { docName } });
      });
  } else if (isFrom === fromMasterProfile) {
    db.collection('RelationShip')
      .doc(docName)
      .get()
      .then(() => {
        console.log('delete request successful');
        //找到該relationship，刪除
        dispatch({ type: UNFRIEND, payload: { docName } });
      });

    // if (!relationship.requestee) {
    //   //在自己的頁面要unfriend別人，此時傳進來的是friend的資料，沒有requestee:對方是requester>>docid：對方在前
    //   whereCondition = `${relationshipOrFriend.requester.uid}-${user.uid}`;
    // } else if (!relationship.requester) {
    //   whereCondition = `${user.uid}-${relationshipOrFriend.uid}`;
    // }
    // [`${profile.uid}-${user.uid}`, `${user.uid}-${profile.uid}`]
  }
};
