import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileRelationShip } from '../redux/actions/relationshipAction';
import { getProfile } from '../redux/actions/profileAction';
import {
  sendFriendRequest,
  acceptFriendRequest,
  unFriend,
} from '../redux/actions/relationshipAction';
import Loading from './Loading';
import RequestItem from './RequestItem';
import { StyleModal } from './PopupModal';
import styles from '../style/profileshow.module.css';
import { FRIEND, REQUESTED, REQUESTING, NORELATIONSHIP, fromProfile } from '../utils/names';

function ProfileShow({ paramsID }) {
  const profile = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const relationships = useSelector((state) => state.relationships);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [friendList, setFriendList] = useState(null);
  const [requestingList, setRequestingList] = useState([]);
  const [requestedList, setRequestedList] = useState([]);
  const [relationshipButton, setRelationshipButton] = useState(NORELATIONSHIP);
  const [isRequestClick, setIsRequestClick] = useState(false);
  const [requestViewState, setRequestViewState] = useState(REQUESTED);
  const [isFriendClick, setIsFriendClick] = useState(false);
  const [isMessageClick, setIsMessageClick] = useState(false);
  console.log(requestingList);
  console.log(requestedList);

  useEffect(() => {
    dispatch(getProfile(paramsID));
    dispatch(getProfileRelationShip(paramsID));
  }, [paramsID]);

  //得到 relationships reducer 後，要做成 ProfileShow 的4個state，用來呈現數字跟list
  const relationshipSplit = () => {
    const friendList = [];
    const requestingList = [];
    const requestedList = [];

    relationships.forEach((relationship) => {
      console.log(relationship);
      //friend
      if (relationship.status === FRIEND) {
        if (relationship.requester.uid === paramsID) {
          friendList.push(relationship.requestee);
        } else if (relationship.requestee.uid === paramsID) {
          friendList.push(relationship.requester);
        }
        setFriendList(friendList);
        console.log(relationship);
        setRelationshipButton(relationship);
      }
      //requesting >>requester >>此人所有送出的要求
      else if (relationship.requester.uid === paramsID) {
        requestingList.push(relationship.requestee);
        setRequestingList(requestingList);
        if (relationship.requestee.uid === user.uid) {
          console.log(relationship);
          relationship.status = REQUESTED;
          setRelationshipButton(relationship);
          //來到此人頁面，得到此人送出的所有要求，若我是被此人邀請的話，我可以按加入
        }

        //requesting >>requestee  >>此人所有收到的要求
        //+若是自己的頁面，要送另一個accept action
      } else if (relationship.requestee.uid === paramsID) {
        requestedList.push(relationship.requester);
        setRequestedList(requestedList);
        if (relationship.requester.uid === user.uid) {
          console.log(relationship);
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
  const buttonViewFriend = (
    <>
      <button
        className={styles.relationshipButton}
        onClick={() => {
          dispatch(unFriend(relationshipButton, fromProfile));
        }}>
        UnFriend
      </button>
      <button
        className={styles.relationshipButton}
        onClick={() => {
          setIsMessageClick(!isMessageClick);
          dispatch(unFriend(relationshipButton, fromProfile));
        }}>
        Message
      </button>
    </>
  );
  //accept: 到requester 頁面，點 accept
  const buttonViewRequested = (
    <button
      className={styles.relationshipButton}
      onClick={() => {
        dispatch(acceptFriendRequest(relationshipButton));
      }}>
      Accept
    </button>
  );
  const buttonViewRequesting = <button>waiting_Rrquesting</button>;
  const buttonViewSendRequest = (
    <button
      className={styles.relationshipButton}
      onClick={() => {
        dispatch(sendFriendRequest());
      }}>
      +Friend
    </button>
  );
  console.log(relationshipButton);

  //state: 以使用者的角色
  //db 上的state : friend,requesting
  //local state: friend, requesting, requested,null
  if (relationshipButton?.status === FRIEND) {
    console.log(relationshipButton);
    buttonView = buttonViewFriend;
  } else if (relationshipButton?.status === REQUESTED) {
    console.log(relationshipButton);
    buttonView = buttonViewRequested;
  } else if (relationshipButton?.status === REQUESTING) {
    console.log(relationshipButton);
    buttonView = buttonViewRequesting;
  } else if (relationshipButton === NORELATIONSHIP) {
    console.log(relationshipButton);
    buttonView = buttonViewSendRequest;
  }

  //request state view
  let requestView = '';
  const makeRequestItems = () => {
    console.log(requestViewState);
    console.log(requestingList);
    console.log(requestedList);
    if (requestViewState === REQUESTING) {
      requestView = requestingList.map((request) => (
        <RequestItem key={request.relationshipID} request={request} status={REQUESTING} />
      ));
    } else if (requestViewState === REQUESTED) {
      console.log(requestedList);
      requestView = requestedList.map((request) => (
        <RequestItem key={request.relationshipID} request={request} status={REQUESTED} />
      ));
      console.log(requestView);
    }
  };
  console.log(requestView);
  return (
    <>
      <div className={styles.profileShowWrap}>
        {loading === false ? (
          <div className={styles.profileShow}>
            <img className={styles.profilePic} src={profile.userProfileImage}></img>
            <div className={styles.profileInfo}>
              <div className={styles.followerBlock}>
                <div className={styles.followerInfo}>{profile.userName}</div>
                <div className={styles.followerInfo}>
                  {user && user.uid !== profile.uid && buttonView}
                </div>
              </div>
              <div className={styles.followerBlock}>
                <div className={styles.postInfo}>
                  {posts.length} <span>Posts</span>
                </div>
                <div
                  className={styles.followerInfo}
                  onClick={() => setIsFriendClick(!isFriendClick)}>
                  {friendList?.length} <span>Friends</span>
                </div>
                {user.uid === profile.uid && (
                  <div
                    className={styles.followerInfo}
                    onClick={() => {
                      setIsRequestClick(!isRequestClick);
                      makeRequestItems();
                    }}>
                    <span>Requests...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
      </div>
      {/* friend block*/}
      <StyleModal
        show={isFriendClick}
        handleClose={() => {
          setIsFriendClick(false);
        }}>
        <div className={styles.friendModelWrap}>
          <div className={styles.friendTopModal}>
            <div className={styles.guide}>Friends</div>
          </div>
          <div className={styles.separater}></div>
          <div className={styles.friendButtonModal}>
            {friendList?.map((friend) => (
              <RequestItem key={friend.relationshipID} friend={friend} status={FRIEND} />
            ))}
          </div>
        </div>
      </StyleModal>
      {/* request block*/}
      <StyleModal
        show={isRequestClick}
        handleClose={() => {
          setIsRequestClick(false);
        }}>
        <div className={styles.requestModelWrap}>
          <div className={styles.requestTopModal}>
            <div className={styles.guide}>Requests</div>
          </div>
          <div className={styles.separater}></div>
          <div className={styles.requestButtonModal}>
            <div className={styles.requestToggle}>
              <div
                onClick={() => {
                  setRequestViewState(REQUESTED);
                }}
                className={`${
                  requestViewState === REQUESTED
                    ? styles.requestStateChoose
                    : styles.requestStateNone
                }`}>
                Friend Requests
              </div>

              <div
                onClick={() => {
                  setRequestViewState(REQUESTING);
                }}
                className={`${
                  requestViewState === REQUESTING
                    ? styles.requestStateChoose
                    : styles.requestStateNone
                }`}>
                Requesting
              </div>
            </div>
          </div>

          <div>{requestView}</div>
        </div>
      </StyleModal>
      ，{' '}
    </>
  );
}

ProfileShow.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileShow;
