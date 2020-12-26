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
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: grey;
  opacity: 0.9;
  z-index: 3;

  @media (max-width: 425px) {
    .postWrap {
      padding: 0px;
    }
    .titleWrap {
      display: none;
    }
  }
`;
const ContentDiv = styled.div`

  min-width: 300px;
  padding:2% 2% 3% 2%;
  align-items:center
  max-width: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #ced1d6;
  background: rgb(255,255,255);
  margin:auto 
`;

export const PostLoginPopup = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    // <ModalWrap show={show}>
    <>
      <div className={`${show ? styles.contentWrap : styles.contentWrapNone}`}>
        <div className='titleWrap'></div>
        <ContentDiv>
          <div className={styles.cancelButton} onClick={handleClose}>
            <div className={styles.cancelWrap}>
              <img className={styles.cancelButtonImg} src={cross}></img>
            </div>
          </div>
          {children}
        </ContentDiv>
      </div>
      <ModalDiv show={show}></ModalDiv>
    </>,

    document.getElementById('portal'),
  );
};

PostLoginPopup.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
