import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

const ContainerDiv = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 60px;
  right: 10px;
  z-index: 3;
`;

const ContentDiv = styled.div`
  box-shadow: 3px 3px 3px #ced1d6;
  border-radius: 5px;
  background: white;
  padding: 10px;
  line-height: 1.5rem;
  cursor: pointer;
`;

export const StyleEditBlock = ({ handleClose, show, children }) => {
  return (
    <ContainerDiv show={show}>
      <ContentDiv>{children}</ContentDiv>
    </ContainerDiv>
  );
};

StyleEditBlock.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.object,
};
