import { generatePath } from 'react-router';
import { useSelector } from 'react-redux';
import { RECEIVED_RELATIONSHIP, SEND_FRIEND_REQUEST } from '../actionTypes';
import { db } from '../../firebase';

// export const getProfileRelationShip = (paramsID) => (dispatch, getState) => {
//   const { user } = getState();
//   console.log(paramsID);
//   const relationships = [];
//   //get profile request friends list
//   db.collection('RelationShip')
//     .where('requester.uid', '==', paramsID)
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//         relationships.push(doc.data());
//       });
//     })
//     .then(() => {
//       //get profile friends request list
//       db.collection('RelationShip')
//         .where('requestee.uid', '==', paramsID)
//         .get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             console.log(doc.data());
//             relationships.push(doc.data());
//           });
//         });
//     })
//     .then(() => {
//       console.log(relationships);
//       dispatch({ type: RECEIVED_RELATIONSHIP, payload: { relationships } });
//     });
// };

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
        console.log(doc.data());
        relationships.push(doc.data());
      });
      //get profile friends request list
      db.collection('RelationShip')
        .where('requestee.uid', '==', paramsID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            relationships.push(doc.data());
          });
          dispatch({ type: RECEIVED_RELATIONSHIP, payload: { relationships } });
        });
    });
};

export const sendFriendRequest = (paramsID) => (dispatch, getState) => {
  const { user } = getState();
  const { profile } = getState();
  console.log(user);
  console.log(profile);
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
    status: 'requesting',
  };

  // //更新db
  db.collection('RelationShip')
    .doc(`${user.uid}-${profile.uid}`)
    .set(relationship)
    .then(() => {
      console.log('send request successful');
    });
  //＋relationship
  dispatch({ type: SEND_FRIEND_REQUEST, payload: { relationship } });
};
