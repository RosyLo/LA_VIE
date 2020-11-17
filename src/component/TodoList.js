import React, { useState } from 'react';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>What needs to be done?</h1>
      <TodoForm onSubmit={addTodo} />
    </div>
  );
}
export default TodoList;
