import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import styled from '../../../style/popup.module.scss';
import cross from '../../../img/cross.png';

export const StoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <div
        className={`${show ? styled.cancelStory : styled.cancelStoryNone}`}
        onClick={() => {
          handleClose(false);
        }}>
        <img
          className={styled.storyCancelImg}
          onClick={() => {
            handleClose(false);
          }}
          src={cross}></img>
      </div>

      <div className={`${show ? styled.showStoryContentDiv : styled.showStoryContentDivDivNone}`}>
        {children}
      </div>
      <div className={`${show ? styled.showStoryModalDiv : styled.showStoryModalDivNone}`} />
    </>,

    document.getElementById('portal'),
  );
};

StoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
