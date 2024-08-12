import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/todos', {
        title,
        content,
        deadline,
        checked,
        priority
      });
      fetchTodos(); // Panggil fetchTodos setelah menambahkan todo
      setTitle('');
      setContent('');
      setDeadline('');
      setChecked(false);
      setPriority(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Todo</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
      />
      <label className="block mb-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="mr-2"
        />
        Completed
      </label>
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        placeholder="Priority"
        min="1"
        max="5"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
