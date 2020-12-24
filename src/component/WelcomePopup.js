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
  opacity: 0.95;
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
  border-radius: 5px;
  box-shadow: 3px 3px 3px #ced1d6;
  background: rgb(250,250,250);
`;
// const Title = styled.div`;
//   position: fixed;
//   top: 50%;
//   left: 40%;
//   transform: translate(-50%, -50%);
//   z-index: 2000;
//   font-size: 3rem;
//   max-width: 300px;
//   }

export const WelcomePopup = ({ handleClose, show, children }) => {
  return ReactDom.createPortal(
    <ModalWrap show={show}>
      <div className='titleWrap'></div>
      <ContentDiv>
        <div className={styles.cancelButton} onClick={handleClose}>
          <img className={styles.cancelButtonImg} src={cross}></img>
        </div>
        {children}
      </ContentDiv>
      <ModalDiv></ModalDiv>
    </ModalWrap>,
    document.getElementById('portal'),
  );
};

WelcomePopup.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
