import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import CancelButton from './CancelButton';
import styles from '../style/popup.module.css';

export const MakeStoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <div className={`${show ? styles.contentWrap : styles.contentWrapNone}`}>
        <div className={styles.storyContentDiv}>
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
          {children}
        </div>
      </div>

      <div className={`${show ? styles.storyModalDiv : styles.storyModalDivNone}`}></div>
    </>,
    document.getElementById('portal'),
  );
};

MakeStoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
