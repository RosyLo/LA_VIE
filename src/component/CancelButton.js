import React from 'react';
import styles from '../style/cancelbutton.module.css';
import cross from '../img/cancel.svg';
import PropTypes from 'prop-types';

function CancelButton({ onClick }) {
  return (
    <div className={styles.cancelWrap} onClick={onClick}>
      <img className={styles.cancelButtonImg} src={cross} />
    </div>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
