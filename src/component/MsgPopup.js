import React from 'react';
import styled from 'styled-components';
import styles from '../style/storybar.module.css';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import cross from '../img/icon.png';
import popupstyles from '../style/popup.module.css';

const ModalWrap = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: grey;
  opacity: 0.9;
  z-index: 4500;
`;

const ContentDiv = styled.div`

  min-width:300px;
  height:200px;
  align-items:center
  max-width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
    background:white;
  display:block;
  border-radius: 8px;

`;

export const MsgPopup = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <ModalWrap show={show}>
        <ContentDiv>
          <div className={styles.cancelStory} onClick={handleClose}>
            <div className={popupstyles.cancelWrap}>
              <img style={{ width: '6px', height: '6px' }} src={cross}></img>
            </div>
          </div>
          {children}
        </ContentDiv>
        <ModalDiv></ModalDiv>
      </ModalWrap>
    </>,

    document.getElementById('portal'),
  );
};

MsgPopup.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
