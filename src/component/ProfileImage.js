import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../style/header.module.css';

function ProfileImage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <img className={styles.navIcon} src={user.photoURL}></img>
    </>
  );
}

export default ProfileImage;

{
  /* <Link to={`/profile_${user.uid}`}>{user.photoURL}</Link> */
}
