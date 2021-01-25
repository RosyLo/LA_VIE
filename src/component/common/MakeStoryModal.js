import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import CancelButton from './CancelButton';
import styles from '../../style/popup.module.css';
import styled from 'styled-components';

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
const ModalWrap = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  animation-name: fade;
  animation-duration: 0.5s;
  width: 100vw;
  height: 80vh;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 2500;
  transform: translate(-50%, -50%);
`;

const ContentDiv = styled.div`
  min-width: 300px;
  max-width: 1000px;
  width: 70%;
  padding: 2%;
  align-items: center;
  max-width: 85%;
  border-radius: 8px;
  box-shadow: 1px 1px 3px #ced1d6;
  background: rgb(255, 255, 255);
  margin: auto;
  position: relative;
`;

export const MakeStoryModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <>
      <ModalWrap show={show}>
        <ContentDiv>
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
          {children}
        </ContentDiv>
      </ModalWrap>
      <ModalDiv show={show} />
    </>,
    document.getElementById('portal'),
  );
};

MakeStoryModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
