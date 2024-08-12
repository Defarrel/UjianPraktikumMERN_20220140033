import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
