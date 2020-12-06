import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../style/header.module.css';

function ProfileImage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user ? (
        <img className={styles.navIcon} src={user.photoURL}></img>
      ) : (
        <img className={styles.navIcon}></img>
      )}
    </>
  );
}

export default ProfileImage;
