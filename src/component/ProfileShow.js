import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '../style/profileshow.module.css';

function ProfileShow() {
  const user = useSelector((state) => state.user);
  console.log(user.photoURL);
  return (
    <div className={styles.profileShowWrap}>
      <div className={styles.profileShow}>
        <img className={styles.profilePic} src={user.photoURL}></img>
        <div className={styles.profileName}>{user.displayName}</div>
        <div className={styles.block}></div>
      </div>
    </div>
  );
}

ProfileShow.propTypes = {};

export default ProfileShow;
