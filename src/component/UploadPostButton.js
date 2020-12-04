import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UploadPostBlock from './UploadPostBlock';
import styles from '../style/header.css';

function UploadPostButton() {
  const [isUploadPopupClick, setisUploadPopupClick] = useState(false);
  console.log(isUploadPopupClick);

  return (
    <>
      <div
        className='navIcon'
        onClick={() => {
          setisUploadPopupClick(true);
        }}>
        +
      </div>
      <UploadPostBlock
        setisUploadPopupClick={setisUploadPopupClick}
        isUploadPopupClick={isUploadPopupClick}
      />
    </>
  );
}

export default UploadPostButton;
