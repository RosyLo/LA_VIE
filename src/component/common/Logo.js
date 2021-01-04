import React from 'react';
import styles from '../../style/header.module.css';
import logo from '../../img/LA_VIE_logo.png';

function Logo() {
  return (
    <>
      <img className={styles.navIcon} src={logo}></img>
    </>
  );
}

export default Logo;
