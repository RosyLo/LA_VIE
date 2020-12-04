import React from 'react';
import styled from 'styled-components';
import styles from '../style/popup.module.css';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

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
  width: 500px;
  height: 500px;
  max-width: 80%;
  max-height: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  border-radius: 5px;
  display: flex;
  box-shadow: 5px 5px 5px grey;
`;

export const StyleModal = ({ handleClose, show, children }) => {
  console.log(show);
  console.log(handleClose);
  console.log(children);
  return ReactDom.createPortal(
    <ModalWrap show={show}>
      <ContentDiv>
        {children}
        <button className={styles.cancelButton} onClick={handleClose}>
          &times;
        </button>
      </ContentDiv>
      <ModalDiv></ModalDiv>
    </ModalWrap>,
    document.getElementById('portal'),
  );
};

StyleModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
