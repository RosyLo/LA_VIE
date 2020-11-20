import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { nanoid } from 'nanoid';

function List(props) {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName('');
    } else {
      alert('no input');
    }
  }

  const [isEditing, setEditing] = useState(props.isEditing);

  const initialTemplate = (
    <div className='list'>
      <button type='submit' className='addButton' onClick={() => setEditing(1)}>
        + Add a list
      </button>
    </div>
  );

  const edingTemplate = (
    <form className='list' onSubmit={handleSubmit}>
      <input
        type='text'
        id='new-list-input'
        className='listinput'
        onChange={handleChange}
        name='text'
        autoComplete='off'
        value={name}></input>
      <button type='submit' className='addButton'>
        Add List
      </button>
      <button type='button' className='deleteButton' onClick={() => setEditing(0)}>
        X
      </button>
    </form>
  );

  //cards//
  const [cards, setCards] = useState(props.cards);
  console.log(props.cards);
  function addCardTask(name) {
    const newCard = { id: 'card-' + nanoid(), name: name, isCardEditing: 2 };
    setCards([...cards, newCard]);
  }

  const cardlist = cards.map((card) => (
    <Card
      id={card.id}
      name={card.name}
      key={card.id}
      isCardEditing={card.isCardEditing}
      addCardTask={addCardTask}
    />
  ));

  const viewingTemplate = (
    <div className='list'>
      <div className='viewinglistdiv'>{props.name}</div>
      <button
        type='button'
        className='btn btn__danger'
        onClick={() => {
          props.deleteList(props.id);
        }}>
        Delete <span className='visually-hidden'>{props.name}</span>
      </button>
      {cardlist}
      {/* <button type='submit' className='addButton' >+ Add a card</button> */}
    </div>
  );

  let view = '';
  whichviewtorender();
  function whichviewtorender() {
    if (isEditing === 0) {
      view = initialTemplate;
    } else if (isEditing === 1) {
      view = edingTemplate;
    } else {
      view = viewingTemplate;
    }
  }

  return <div className='todo'>{view}</div>;
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  isEditing: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
};
export default List;
