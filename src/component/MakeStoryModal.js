import React from 'react';
import styled from 'styled-components';
import styles from '../style/popup.module.css';
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
  z-index: 3;
`;

const ContentDiv = styled.div`
  background-color: white;
  min-width: 400px;
  width:70%;
  padding:1.5%;
  align-items:center
  max-width: 85%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #ced1d6;
  display:block;

`;

export const MakeStoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <ModalWrap show={show}>
      <ContentDiv>
        <button className={styles.cancelButton} onClick={handleClose}>
          <img style={{ width: '10px', height: '10px' }} src={cross}></img>
        </button>
        {children}
      </ContentDiv>
      <ModalDiv></ModalDiv>
    </ModalWrap>,
    document.getElementById('portal'),
  );
};

MakeStoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
