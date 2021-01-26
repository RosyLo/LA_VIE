import { useState, useEffect } from 'react';
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
import styles from '../../style/profileshow.module.scss';
import { FRIEND, REQUESTED, REQUESTING, FROMPROFILE } from '../../utils/names';

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
  const [relationshipButton, setRelationshipButton] = useState(null);
  const [isRequestClick, setIsRequestClick] = useState(false);
  const [requestViewState, setRequestViewState] = useState(REQUESTED);
  const [isFriendClick, setIsFriendClick] = useState(false);
  const [isMessageClick, setIsMessageClick] = useState(false);

  useEffect(() => {
    dispatch(getProfile(paramsID));
    dispatch(getProfileRelationShip(paramsID));
  }, [paramsID]);
  //當使用者在別人頁面時，要判斷與此人關係為何
  useEffect(() => {
    // relationshipSplit();
    if (relationships && user && profile) {
      const friendList = relationships
        .filter((rel) => rel.status === FRIEND)
        .map((rel) => (rel.requester.uid === profile.uid ? rel.requestee : rel.requester));

      const ourRelationship = relationships.find(
        (rel) =>
          (rel.requestee.uid === profile.uid || rel.requester.uid === profile.uid) &&
          (rel.requestee.uid === user.uid || rel.requester.uid === user.uid),
      );
      setRelationshipButton(ourRelationship);
      setFriendList(friendList);

      //到自己頁面有requestlist
      if (user.uid === profile.uid) {
        const requestingList = relationships
          .filter((rel) => rel.status === REQUESTING && rel.requester.uid === profile.uid)
          .map((rel) => rel.requestee);

        const requestedList = relationships
          .filter((rel) => rel.status === REQUESTING && rel.requestee.uid === profile.uid)
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
          dispatch(unFriend(relationshipButton, FROMPROFILE));
        }}>
        UnFriend
      </button>
      {/* <button
        className={styles.relationshipButton}
        onClick={() => {
          setIsMessageClick(!isMessageClick);
        }}>
        Message
      </button> */}
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
  const buttonViewRequesting = <div className={styles.decideButtonVag}>Waiting</div>;
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
  } else if (relationshipButton?.status === REQUESTING) {
    if (relationshipButton.requestee.uid === user.uid) {
      buttonView = buttonViewRequested;
    } else if (relationshipButton.requester.uid === user.uid) {
      buttonView = buttonViewRequesting;
    }
  } else {
    buttonView = buttonViewSendRequest;
  }

  //request state view
  let requestView = '';
  if (requestViewState === REQUESTING) {
    requestView = requestingList.map((relatedUser) => (
      <RequestItem key={relatedUser.uid} relatedUser={relatedUser} status={REQUESTING} />
    ));
  } else if (requestViewState === REQUESTED) {
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
    </>
  );
}

ProfileShow.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileShow;
