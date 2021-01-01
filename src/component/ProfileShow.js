import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileRelationShip } from '../redux/actions/relationshipAction';
import { getProfile } from '../redux/actions/profileAction';
import { sendFriendRequest } from '../redux/actions/relationshipAction';
import styles from '../style/profileshow.module.css';
import Loading from './Loading';
import { db } from '../firebase';

function ProfileShow({ paramsID }) {
  const profile = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const relationships = useSelector((state) => state.relationships);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [friendList, setFriendList] = useState(null);
  const [requestingList, setRequestingList] = useState(null);
  const [requestedList, setRequestedList] = useState(null);
  const [relationshipButton, setRelationshipButton] = useState('norelationship');
  console.log(relationships);
  console.log(friendList);
  console.log(requestingList);
  console.log(requestedList);
  console.log(relationshipButton);
  console.log(profile);

  useEffect(() => {
    dispatch(getProfile(paramsID));
    dispatch(getProfileRelationShip(paramsID));
  }, [paramsID]);

  const relationshipSplit = () => {
    const friendList = [];
    const requestingList = [];
    const requestedList = [];

    relationships.forEach((relationship) => {
      console.log(relationship);
      //friend
      if (relationship.status === 'friend') {
        if (relationship.requester.uid === paramsID) {
          friendList.push(relationship.requestee);
        } else if (relationship.requestee.uid === paramsID) {
          friendList.push(relationship.requester);
        }
        setFriendList(friendList);
        setRelationshipButton(relationship);
      }
      //requesting >>requester >>此人所有送出的要求
      else if (relationship.requester.uid === paramsID) {
        requestingList.push(relationship.requestee);
        setRequestingList(requestingList);
        if (relationship.requestee.uid === user.uid) {
          setRelationshipButton(relationship);
          //來到此人頁面，得到此人送出的所有要求，若我是被此人邀請的話，我可以按加入
          relationship.status = 'requested';
        }
        //requesting >>requestee  >>此人所有收到的要求
      } else if (relationship.requestee.uid === paramsID) {
        requestedList.push(relationship.requester);
        setRequestedList(requestedList);
        if (relationship.requester.uid === user.uid) {
          setRelationshipButton(relationship);
        }
      } else console.log(relationship);
    });
  };
  //dipatch relationship
  useEffect(() => {
    relationshipSplit();
  }, [relationships]);

  let buttonView = '';
  //unfollow?
  const buttonViewFriend = <button>Friend</button>;
  //accept: add
  const buttonViewRequested = <button> accept_Requested</button>;
  const buttonViewRequesting = <button>waiting_Rrquesting</button>;
  const buttonViewSendRequest = (
    <button
      onClick={() => {
        dispatch(sendFriendRequest(paramsID));
      }}>
      +Friend
    </button>
  );
  console.log(relationshipButton);

  //state: 以使用者的角色
  //db 上的state : friend,requesting
  //local state: friend, requesting, requested,null
  if (relationshipButton?.status === 'friend') {
    console.log(relationshipButton);
    buttonView = buttonViewFriend;
  } else if (relationshipButton?.status === 'requested') {
    console.log(relationshipButton);
    buttonView = buttonViewRequested;
  } else if (relationshipButton?.status === 'requesting') {
    console.log(relationshipButton);
    buttonView = buttonViewRequesting;
  } else if (relationshipButton === 'norelationship') {
    console.log(relationshipButton);
    buttonView = buttonViewSendRequest;
  }

  return (
    <div className={styles.profileShowWrap}>
      {loading === false ? (
        <div className={styles.profileShow}>
          <img className={styles.profilePic} src={profile.userProfileImage}></img>
          <div className={styles.profileInfo}>
            <div className={styles.followerBlock}>
              {profile.userName}
              {user && buttonView}
            </div>
            <div className={styles.followerBlock}>
              <div className={styles.followerInfo}>
                {posts.length} <span>Posts</span>
              </div>
              <div className={styles.followerInfo}>
                {posts.length} <span>Followers...</span>
              </div>
              <div className={styles.followerInfo}>
                {posts.length} <span>Following...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
}

ProfileShow.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileShow;
