import React from 'react';
import styled from 'styled-components';
import styles from '../style/storybar.module.css';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import cross from '../img/cross.png';

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
  z-index: 50;
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
  z-index: 12;
    background:white;
  display:block;
  border-radius:55px

`;

export const MsgPopup = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <ModalWrap show={show}>
        <ContentDiv>
          {' '}
          <div className={styles.cancelStory} onClick={handleClose}>
            <img style={{ width: '10px', height: '10px' }} src={cross}></img>
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
