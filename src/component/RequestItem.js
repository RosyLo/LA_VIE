import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, unFriend } from '../redux/actions/relationshipAction';
import styles from '../style/request.module.css';
import {
  FRIEND,
  REQUESTED,
  REQUESTING,
  NORELATIONSHIP,
  UNFRIEND,
  fromMasterProfile,
} from '../utils/names';

function RequestItem({ request, status, friend }) {
  console.log(request);
  console.log(friend);
  //request,friend：都只有對方的資料，沒有status,和自己的
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  //requesting, requested,friend,unfriend
  const [requestStateButton, setRequestStateButton] = useState(status);

  let toggleView = '';
  //request path
  let relationship;
  if (request) {
    relationship = {
      requester: {
        uid: request.uid,
        userName: request.userName,
        userProfileImage: request.userProfileImage,
      },
      requestee: {
        uid: profile.uid,
        userName: profile.userName,
        userProfileImage: profile.userProfileImage,
      },
      status: 'requesting',
      relationshipID: `${request.uid}-${profile.uid}`,
    };
  }
  console.log(requestStateButton);

  // list toggle view
  const requestedView = (
    <button
      className={styles.requestButton}
      onClick={() => {
        console.log(relationship);
        dispatch(acceptFriendRequest(relationship));
        setRequestStateButton(FRIEND);
      }}>
      Accept
    </button>
  );

  const friendView = (
    <button
      className={styles.requestButton}
      onClick={() => {
        dispatch(unFriend(friend, fromMasterProfile));
        // setRequestStateButton(UNFRIEND);
      }}>
      UnFriend
    </button>
  );

  if (requestStateButton === REQUESTED) {
    toggleView = requestedView;
    console.log(requestedView);
  } else if (requestStateButton === FRIEND) {
    console.log(friendView);
    toggleView = friendView;
  }

  console.log(status);
  console.log(requestStateButton);
  console.log(toggleView);
  return (
    <>
      {request ? (
        <div className={styles.request}>
          <img className={styles.requestImage} src={request.userProfileImage} />
          <p>
            <span className={styles.requestName}>{request.userName}</span>

            <span className={styles.requestMsg}></span>
          </p>
          <div className={styles.requestActions}>
            {status === REQUESTED ? (
              <>{toggleView}</>
            ) : (
              <div className={styles.stateBlock}>Requesting</div>
            )}
          </div>
        </div>
      ) : (
        // friend
        <div className={styles.request}>
          <img className={styles.requestImage} src={friend.userProfileImage} />
          <p>
            <span className={styles.requestName}>{friend.userName}</span>

            <span className={styles.requestMsg}></span>
          </p>
          <div className={styles.requestActions}>{toggleView}</div>
        </div>
      )}
    </>
  );
}

RequestItem.propTypes = {
  request: PropTypes.object,
  friend: PropTypes.object.isRequired,
  status: PropTypes.string,
};
export default RequestItem;
