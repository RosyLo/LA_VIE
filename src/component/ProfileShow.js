import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '../style/profileshow.module.css';
import styled from 'styled-components';
import Loading from './Loading';
import firebase, { db, auth, facebookAuthProvider, googleAuthProvider } from '../firebase';

function ProfileShow({ paramsID }) {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    db.collection('User')
      .doc(paramsID)
      .get()
      .then((doc) => {
        setProfile(doc.data());
      });
  }, [paramsID]);
  const loading = useSelector((state) => state.loading);

  return (
    <div className={styles.profileShowWrap}>
      {profile ? (
        <div className={styles.profileShow}>
          <img className={styles.profilePic} src={profile.userProfileImage}></img>
          <div className={styles.profileInfo}>
            <div>{profile.userName}</div>
            <div></div>
            <div className={styles.followerBlock}>
              <div className={styles.followerInfo}>
                {posts.length} <span>Posts</span>
              </div>
              {/* <div className={styles.followerInfo}>＿Followers</div>
              <div className={styles.followerInfo}>＿Following</div> */}
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
