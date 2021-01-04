import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, unFriend } from '../../redux/actions/relationshipAction';
import styles from '../../style/request.module.css';
import { FRIEND, REQUESTED, fromMasterProfile } from '../../utils/names';

function RequestItem({ relatedUser, status }) {
  //request,friend：都只有對方的資料，沒有status,和自己的
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  //requesting, requested,friend,unfriend
  const [requestStateButton, setRequestStateButton] = useState(status);

  let toggleView = '';

  if (status === FRIEND) {
    toggleView = (
      <button
        className={styles.requestButton}
        onClick={() => {
          dispatch(unFriend(relatedUser, fromMasterProfile));
        }}>
        UnFriend
      </button>
    );
  } else if (profile.uid === user.uid) {
    if (status === REQUESTED) {
      toggleView = (
        <button
          className={styles.requestButton}
          onClick={() => {
            dispatch(acceptFriendRequest(`${relatedUser.uid}-${user.uid}`));
          }}>
          Accept
        </button>
      );
    } else if (status === REQUESTING) {
      toggleView = <div className={styles.stateBlock}>Requesting</div>;
    }
  }

  return (
    <div className={styles.request}>
      <img className={styles.requestImage} src={relatedUser.userProfileImage} />
      <p>
        <span className={styles.requestName}>{relatedUser.userName}</span>
        <span className={styles.requestMsg}></span>
      </p>
      {toggleView && <div className={styles.requestActions}>{toggleView}</div>}
    </div>
  );
}

RequestItem.propTypes = {
  relatedUser: PropTypes.object,
  status: PropTypes.string,
};
export default RequestItem;

// //request path
// let relationship;
// if (request) {
//   relationship = {
//     requester: {
//       uid: request.uid,
//       userName: request.userName,
//       userProfileImage: request.userProfileImage,
//     },
//     requestee: {
//       uid: profile.uid,
//       userName: profile.userName,
//       userProfileImage: profile.userProfileImage,
//     },
//     status: 'REQUESTING',
//     relationshipID: `${request.uid}-${profile.uid}`,
//   };
// }

// // list toggle view
// const requestedView = (
//   <button
//     className={styles.requestButton}
//     onClick={() => {
//       console.log(relationship);
//       dispatch(acceptFriendRequest(relationship));
//       setRequestStateButton(FRIEND);
//     }}>
//     Accept
//   </button>
// );

// const friendView = (
//   <button
//     className={styles.requestButton}
//     onClick={() => {
//       dispatch(unFriend(friend, fromMasterProfile));
//     }}>
//     UnFriend
//   </button>
// );

// if (requestStateButton === REQUESTED) {
//   toggleView = requestedView;
// } else if (requestStateButton === FRIEND) {
//   toggleView = friendView;
// }
