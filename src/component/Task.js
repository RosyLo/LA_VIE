import React from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  return (
    <div className='list'>
      <div className='listdiv'>{props.name}</div>
      <button type='submit' className='addButton'>
        + Add a card
      </button>
    </div>
  );
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Task;
