import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import StackGrid from 'react-stack-grid';

function App(props) {
  return (
    <div>
      <StackGrid columnWidth={300} gutterWidth={10}>
        <div key='key1' className='key'>
          Item 1
        </div>
        <div key='key2' className='key'>
          Item 2<img className='photo' src='https://source.unsplash.com/epcsn8Ed8kY/600x799'></img>
        </div>
        <div key='key3' className='key'>
          Item3<img className='photo' src='https://source.unsplash.com/NQSWvyVRIJk/800x599'></img>
        </div>
        <div key='key4' className='key'>
          Item 4
        </div>
        <div key='key5' className='key'>
          Item 5
        </div>
      </StackGrid>
    </div>
  );
}

// App.propTypes = {
//   name: PropTypes.string,
//   tasks: PropTypes.array.isRequired,
// };

export default App;
