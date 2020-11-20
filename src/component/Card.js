import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const [cardName, setCardName] = useState('');
  function handleCardChange(e) {
    setCardName(e.target.value);
  }

  function handleCardSubmit(e) {
    e.preventDefault();
    if (cardName) {
      props.addCardTask(cardName);
      console.log(cardName);
      setCardName('');
    } else {
      alert('no input');
    }
  }

  console.log(props);
  const [isCardEditing, setCardEditing] = useState(props.isCardEditing);
  const initialCardTemplate = (
    <div className='initiallistcard'>
      {/* <div className='listdiv'>initial card{props.name}</div> */}
      <button type='submit' className='addButton' onClick={() => setCardEditing(1)}>
        + Add a Card
      </button>
    </div>
  );

  const edingCardTemplate = (
    <form className='cardList' onSubmit={handleCardSubmit}>
      <input
        type='text'
        id='new-card-list-input'
        className='addButton'
        onChange={handleCardChange}
        name='text'
        autoComplete='off'
        value={cardName}></input>
      <button type='submit' className='addButton'>
        Add Card
      </button>
      <button type='button' className='deleteButton' onClick={() => setCardEditing(0)}>
        X
      </button>
    </form>
  );

  const viewingCardTemplate = (
    <div className='viewinglistcard'>
      <div className='listdiv'>{props.name}</div>
      {/* <button type='submit' className='addButton' >+ Add a card</button> */}
    </div>
  );

  let viewCard = '';
  whichviewtorender();
  function whichviewtorender() {
    console.log(isCardEditing);

    if (isCardEditing === 0) {
      console.log('0');
      viewCard = initialCardTemplate;
    } else if (isCardEditing === 1) {
      console.log('1');
      viewCard = edingCardTemplate;
    } else {
      console.log('2');
      viewCard = viewingCardTemplate;
    }
  }

  return <div className='cardTodo'>{viewCard}</div>;
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addCardTask: PropTypes.func.isRequired,
  isCardEditing: PropTypes.number.isRequired,
  // cards:PropTypes.array.isRequired,
};
export default Card;
