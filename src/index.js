import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const DATA = [
  { id: 'task-0', name: '', isEditing: 0 },
  // { id: 'task-1', name: 'Sleep' },
  // { id: 'task-2', name: 'Repeat' },
];

ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));
