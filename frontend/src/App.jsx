import React from 'react';
import AddTodoForm from './components/AddTodoFrom';
import TodoList from './components/TodoList';
import './index.css';

function App() {
  return (
    <div className="App">
      <AddTodoForm fetchTodos={() => document.querySelector('TodoList').fetchTodos()} />
      <TodoList />
    </div>
  );
}

export default App;
