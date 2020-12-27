import React from 'react';
import styled, { keyframes } from 'styled-components';

import styles from '../style/popup.module.css';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import CancelButton from './CancelButton';

const ModalWrap = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: grey;
  opacity: 0.9;
  z-index: 2000;
`;

const ContentDiv = styled.div`
  min-width: 300px;
  max-width: 1000px;
  width:70%;
  padding:2%;
  align-items:center
  max-width: 85%;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #ced1d6;
  background: rgb(255,255,255);
  margin:auto;
  position: relative;
`;

export const MakeStoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      {/* <ModalWrap show={show}> */}
      <div className={`${show ? styles.contentWrap : styles.contentWrapNone}`}>
        <ContentDiv>
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
          {children}
        </ContentDiv>
      </div>
      {/* </ModalWrap> */}
      <ModalDiv show={show}></ModalDiv>
    </>,
    document.getElementById('portal'),
  );
};

MakeStoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
