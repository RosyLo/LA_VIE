import React from 'react';

export default function Todo(props) {
  return (
    <li className='todo stack-small'>
      <div className='c-cb'>
        <input id={props.id} type='checkbox' defaultChecked={props.completed} />
        <label className='todo-label' htmlFor='todo-0'>
          {props}
        </label>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn'>
          Edit <span className='visually-hidden'>Eat</span>
        </button>
        <button type='button' className='btn btn__danger'>
          Delete <span className='visually-hidden'>Eat</span>
        </button>
      </div>
    </li>
  );
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
