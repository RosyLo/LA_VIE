import React from 'react';
import styled from 'styled-components';
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
  z-index: 3;
`;

const ContentDiv = styled.div`
  min-width: 300px;
  max-width: 800px;
  max-height: 650px;
  width: 70%;
  padding: 2% 2% 3% 2%;
  align-items: center
  max-width: 800px;
  z-index: 4;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #ced1d6;
  background: rgb(255, 255, 255);
  margin: auto;
  position: relative;
`;

export const StyleModal = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    // <ModalWrap show={show}>
    <>
      <div className={`${show ? styles.contentWrap : styles.contentWrapNone}`}>
        <ContentDiv>
          <div className={styles.close}>
            <CancelButton onClick={handleClose} />
          </div>
          {children}
        </ContentDiv>
      </div>
      <ModalDiv show={show}></ModalDiv>
    </>,
    // </ModalWrap>,
    document.getElementById('portal'),
  );
};

StyleModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
