import React from 'react';
import styles from '../style/popup.module.css';
import PropTypes from 'prop-types';

export const BarPopup = ({ handleClose, show, top, right, children }) => {
  return (
    <div
      className={`${show ? styles.editContainerDiv : styles.editContainerDivNone}`}
      style={{ top: top, right: right }}>
      <div className={`${show ? styles.editContentDiv : styles.editContentDivNone}`}>
        {children}
      </div>
    </div>
  );
};

BarPopup.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  top: PropTypes.string,
  right: PropTypes.string,
  children: PropTypes.object,
};
