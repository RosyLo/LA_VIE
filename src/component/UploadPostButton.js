import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UploadPostBlock from './UploadPostBlock';
import styles from '../style/header.module.css';
import plus from '../img/plus.png';

function UploadPostButton() {
  const [isUploadPopupClick, setisUploadPopupClick] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setisUploadPopupClick(true);
        }}>
        <img className={styles.navIcon} src={plus} />
      </div>
      <UploadPostBlock
        setisUploadPopupClick={setisUploadPopupClick}
        isUploadPopupClick={isUploadPopupClick}
      />
    </>
  );
}

export default UploadPostButton;
