import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../style/profileshow.module.css';
import Loading from './Loading';
import { db } from '../firebase';

function ProfileShow({ paramsID }) {
  const [profile, setProfile] = useState(null);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    db.collection('User')
      .doc(paramsID)
      .get()
      .then((doc) => {
        setProfile(doc.data());
      });
  }, [paramsID]);

  return (
    <div className={styles.profileShowWrap}>
      {profile ? (
        <div className={styles.profileShow}>
          <img className={styles.profilePic} src={profile.userProfileImage}></img>
          <div className={styles.profileInfo}>
            <div>{profile.userName}</div>
            <div className={styles.followerBlock}>
              <div className={styles.followerInfo}>
                {posts.length} <span>Posts</span>
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
