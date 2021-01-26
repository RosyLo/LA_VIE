import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import cross from '../../img/cancel.svg';
import styles from '../../style/storybar.module.scss';
import popupstyles from '../../style/popup.module.scss';

export const MsgPopup = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <div className={`${show ? popupstyles.msgContentDiv : popupstyles.msgContentDivNone}`}>
        <div className={styles.cancelStory} onClick={handleClose}>
          <div className={popupstyles.cancelWrap}>
            <img style={{ width: '6px', height: '6px' }} src={cross}></img>
          </div>
        </div>
        {children}
      </div>
      <div className={`${show ? popupstyles.msgModalDiv : popupstyles.msgModalDivNone}`} />
    </>,

    document.getElementById('portal'),
  );
};

MsgPopup.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
