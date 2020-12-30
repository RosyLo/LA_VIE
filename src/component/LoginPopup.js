import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import CancelButton from './CancelButton';
import styles from '../style/popup.module.css';

export const LoginPopup = ({ handleClose, show, children, slideTime }) => {
  return ReactDom.createPortal(
    <>
      <div className={`${show ? styles.contentDiv : styles.contentWrapNone}`}>
        {slideTime ? (
          <div
            className={styles.close}
            onClick={() => {
              slideTime();
            }}>
            <CancelButton onClick={handleClose} />
          </div>
        ) : (
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
        )}
        {children}
      </div>

      <div className={`${show ? styles.modalDiv : styles.modalDivNone}`}></div>
    </>,

    document.getElementById('portal'),
  );
};

LoginPopup.propTypes = {
  handleClose: PropTypes.func,
  slideTime: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
