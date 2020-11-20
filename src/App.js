import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import PropTypes from 'prop-types';
import List from './component/List';
import { nanoid } from 'nanoid';
// import Form from './component/Form';

const CARD = [{ id: 'card-0', name: '', isCardEditing: 0 }];

function App(props) {
  const [lists, setLists] = useState(props.tasks);

  const tasklist = lists.map((list) => (
    <List
      id={list.id}
      name={list.name}
      key={list.id}
      isEditing={list.isEditing}
      addTask={addTask}
      cards={CARD}
      deleteList={deleteList}
    />
  ));

  function deleteList(id) {
    const remainingLists = lists.filter((list) => id !== list.id);
    setLists(remainingLists);
  }

  function addTask(name) {
    const newList = { id: 'todo-' + nanoid(), name: name, isEditing: 2 };
    setLists([newList, ...lists]);
  }

  return (
    <div className='listapp'>
      <div className='heading'>Trello-Like </div>
      <div role='list' className='tasklist'>
        {tasklist}
      </div>
    </div>
  );
}

App.propTypes = {
  name: PropTypes.string,
  tasks: PropTypes.array.isRequired,
};

export default App;
