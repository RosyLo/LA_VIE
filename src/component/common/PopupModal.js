import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import CancelButton from './CancelButton';
import styles from '../../style/popup.module.scss';

export const StyleModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <div className={`${show ? styles.contentWrap : styles.contentWrapNone}`}>
        <div className={styles.postContentDiv}>
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
          {children}
        </div>
      </div>
      <div className={`${show ? styles.postModalDiv : styles.postModalDivNone}`} />
    </>,
    document.getElementById('portal'),
  );
};

StyleModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
