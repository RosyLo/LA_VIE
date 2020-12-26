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
  z-index: 6;
`;

const ContentDiv = styled.div`

  width:100%;
  align-items:center
  max-width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
  display:block;

`;

export const StoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <ModalWrap show={show}>
        <div className={styles.cancelStory} onClick={handleClose}>
          <img style={{ width: '12px', height: '12px' }} src={cross}></img>
        </div>
        <ContentDiv> {children}</ContentDiv>
        <ModalDiv></ModalDiv>
      </ModalWrap>
    </>,

    document.getElementById('portal'),
  );
};

StoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
