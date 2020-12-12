import React from 'react';
import PropTypes from 'prop-types';
import WelcomeShow from './WelcomeShow';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import MakeStory from './MakeStory';
import Modal from 'react-modal';

function MakeStoryModal() {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'></Modal>
    </>
  );
}

export default MakeStoryModal;
