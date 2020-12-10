import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '../style/profileshow.module.css';
import firebase from '../firebase';

function ProfileShow({ paramsID }) {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection('User')
      .doc(paramsID)
      .get()
      .then((doc) => {
        setProfile(doc.data());
      });
  }, []);

  return (
    <div className={styles.profileShowWrap}>
      {profile ? (
        <div className={styles.profileShow}>
          <img className={styles.profilePic} src={profile.userProfileImage}></img>
          <div className={styles.profileName}>{profile.userName}</div>
          <div className={styles.profileWords}>{profile.profileMessage}</div>
          <div className={styles.block}></div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

ProfileShow.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileShow;
