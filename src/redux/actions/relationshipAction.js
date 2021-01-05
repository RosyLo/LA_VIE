import { generatePath } from 'react-router';
import { useSelector } from 'react-redux';
import { RECEIVED_RELATIONSHIP, SEND_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST } from '../actionTypes';
import { db } from '../../firebase';
import { UNFRIEND, FRIEND, REQUESTING, fromProfile, fromMasterProfile } from '../../utils/names';

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

export const acceptFriendRequest = (relationshipID) => (dispatch, getState) => {
  // db:找到該relationship, 改status
  db.collection('RelationShip')
    .doc(relationshipID)
    .update({
      status: FRIEND,
    })
    .then(() => {
      console.log('update request successful');
      //找到該relationship，改status
      dispatch({ type: ACCEPT_FRIEND_REQUEST, payload: { relationshipID } });
    });
};

export const unFriend = (friend, isFrom) => (dispatch, getState) => {
  console.log(friend);
  console.log(isFrom);
  const { user } = getState();
  let docName;
  if (isFrom === fromProfile) {
    docName = friend.relationshipID;
    db.collection('RelationShip')
      .doc(docName)
      .delete()
      .then(() => {
        console.log('delete request successful');
        dispatch(excuteDeleteRelationship(docName));
        //找到該relationship，刪除
      });
  } else if (isFrom === fromMasterProfile) {
    //找到該relationship，刪除
    db.collection('RelationShip')
      .where('relationshipID', '==', `${friend.uid}-${user.uid}`)
      .get()
      .then((res) => {
        if (res) {
          console.log(res);
          docName = `${friend.uid}-${user.uid}`;
          console.log(docName);
          dispatch(excuteDeleteRelationship(docName));
        } else if (!res) {
          db.collection('RelationShip')
            .where('relationshipID', '==', `${user.uid}-${friend.uid}`)
            .get()
            .then((res) => {
              console.log(res);
              docName = `${user.uid}-${friend.uid}`;
              dispatch(excuteDeleteRelationship(docName));
            });
        }
      });
  }
};

const excuteDeleteRelationship = (docName) => (dispatch) => {
  console.log(docName);
  db.collection('RelationShip')
    .doc(docName)
    .delete()
    .then(() => {
      console.log(docName);
      dispatch({ type: UNFRIEND, payload: { docName } });
    });
};
