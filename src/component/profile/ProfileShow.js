import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileRelationShip } from '../../redux/actions/relationshipAction';
import { getProfile } from '../../redux/actions/profileAction';
import {
  sendFriendRequest,
  acceptFriendRequest,
  unFriend,
} from '../../redux/actions/relationshipAction';
import Loading from '../common/Loading';
import RequestItem from '../profile/RequestItem';
import { StyleModal } from '../common/PopupModal';
import styles from '../../style/profileshow.module.css';
import { FRIEND, REQUESTED, REQUESTING, fromProfile } from '../../utils/names';

function ProfileShow({ paramsID }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const relationships = useSelector((state) => state.relationships);
  const loading = useSelector((state) => state.loading);
  const [friendList, setFriendList] = useState(null);
  const [requestingList, setRequestingList] = useState([]);
  const [requestedList, setRequestedList] = useState([]);
  const [relationshipButton, setRelationshipButton] = useState(null);
  const [isRequestClick, setIsRequestClick] = useState(false);
  const [requestViewState, setRequestViewState] = useState(null); //??
  const [isFriendClick, setIsFriendClick] = useState(false);
  const [isMessageClick, setIsMessageClick] = useState(false);
  console.log(requestedList);

  useEffect(() => {
    dispatch(getProfile(paramsID));
    dispatch(getProfileRelationShip(paramsID));
  }, [paramsID]);
  //當使用者在別人/自己頁面時，要判斷與此人關係為何
  useEffect(() => {
    if (relationships && user && profile) {
      //在自己/別人頁面，都需要friendlist
      const friendList = relationships
        .filter((rel) => rel.status === FRIEND)
        .map((rel) => (rel.requester.uid === profile.uid ? rel.requestee : rel.requester));
      //到對方頁面：找relationship
      let ourRelationship = relationships.find(
        (rel) => rel.requestee.uid === profile.uid || rel.requester.uid === profile.uid,
      );
      console.log(ourRelationship);
      console.log(user.uid);
      //若沒有關係：
      //到對方頁面：若是我邀請對方，對方被我邀請
      if (ourRelationship?.requester?.uid === user.uid) {
        ourRelationship.status = REQUESTING;
        console.log(ourRelationship);
      } else if (ourRelationship?.requestee?.uid === user.uid) {
        //到對方頁面：若是對方邀請我，我被對方邀請
        ourRelationship.status = REQUESTED;
        console.log(ourRelationship);
      } else ourRelationship = null;
      console.log(ourRelationship);
      setRelationshipButton(ourRelationship);
      setFriendList(friendList);
      //到自己頁面，有request list
      if (user.uid === profile.uid) {
        const requestingList = relationships
          .filter((rel) => rel.status === REQUESTING && rel.requester.uid === profile.uid)
          .map((rel) => rel.requestee);

        const requestedList = relationships
          .filter((rel) => rel.status === REQUESTED && rel.requestee.uid === profile.uid)
          .map((rel) => rel.requester);

        setRequestedList(requestedList);
        setRequestingList(requestingList);
      }
    }
  }, [relationships, profile, user]);

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
        dispatch(acceptFriendRequest(relationshipButton.relationshipID));
      }}>
      Accept
    </button>
  );
  const buttonViewRequesting = <div className={styles.relationshipButton}>Waiting</div>;
  const buttonViewSendRequest = (
    <button
      className={styles.relationshipButton}
      onClick={() => {
        dispatch(sendFriendRequest());
      }}>
      +Friend
    </button>
  );

  //state: 以使用者的角色
  //db 上的state : friend,requesting
  //local state: friend, requesting, requested,null
  let buttonView = '';
  if (relationshipButton?.status === FRIEND) {
    buttonView = buttonViewFriend;
  } else if (relationshipButton?.status === REQUESTED) {
    buttonView = buttonViewRequested;
  } else if (relationshipButton?.status === REQUESTING) {
    buttonView = buttonViewRequesting;
  } else {
    buttonView = buttonViewSendRequest;
  }
  console.log(requestViewState);
  //request state view
  let requestView = '';
  if (requestViewState === REQUESTING) {
    console.log(requestingList);
    requestView = requestingList.map((relatedUser) => (
      <RequestItem key={relatedUser.uid} relatedUser={relatedUser} status={REQUESTING} />
    ));
  } else if (requestViewState === REQUESTED) {
    console.log(requestedList);
    requestView = requestedList.map((relatedUser) => (
      <RequestItem key={relatedUser.uid} relatedUser={relatedUser} status={REQUESTED} />
    ));
  }
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
            {friendList?.map((relatedUser) => (
              <RequestItem
                key={relatedUser.relationshipID}
                relatedUser={relatedUser}
                status={FRIEND}
              />
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

// //得到 relationships reducer 後，要做成 ProfileShow 的4個state，用來呈現數字跟list
// const relationshipSplit = () => {
//   const friendList = [];
//   const requestingList = [];
//   const requestedList = [];

//   relationships.forEach((relationship) => {
//     console.log(relationship);
//     //friend
//     if (relationship.status === FRIEND) {
//       if (relationship.requester.uid === paramsID) {
//         friendList.push(relationship.requestee);
//       } else if (relationship.requestee.uid === paramsID) {
//         friendList.push(relationship.requester);
//       }
//       setFriendList(friendList);
//       console.log(relationship);
//     }
//     //requesting >>requester >>此人所有送出的要求
//     else if (relationship.requester.uid === paramsID) {
//       requestingList.push(relationship.requestee);
//       setRequestingList(requestingList);
//       if (relationship.requestee.uid === user.uid) {
//         console.log(relationship);
//         relationship.status = REQUESTED;
//         //來到此人頁面，得到此人送出的所有要求，若我是被此人邀請的話，我可以按加入
//       }

//       //requesting >>requestee  >>此人所有收到的要求
//       //+若是自己的頁面，要送另一個accept action
//     } else if (relationship.requestee.uid === paramsID) {
//       requestedList.push(relationship.requester);
//       setRequestedList(requestedList);
//       if (relationship.requester.uid === user.uid) {
//         console.log(relationship);
//       }
//     } else console.log(relationship);
//     setRelationshipButton(relationship);
//   });
// };
// dipatch relationship
