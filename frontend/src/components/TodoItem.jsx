import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedContent, setUpdatedContent] = useState(todo.content);
  const [updatedDeadline, setUpdatedDeadline] = useState(todo.deadline ? todo.deadline.split('T')[0] : '');
  const [updatedChecked, setUpdatedChecked] = useState(todo.checked);
  const [updatedPriority, setUpdatedPriority] = useState(todo.priority);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/todos/${todo._id}`, {
        title: updatedTitle,
        content: updatedContent,
        deadline: updatedDeadline,
        checked: updatedChecked,
        priority: updatedPriority
      });
      setIsEditing(false);
      fetchTodos(); // Ambil data terbaru setelah pembaruan
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${todo._id}`);
      fetchTodos(); // Ambil data terbaru setelah penghapusan
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="p-4 mb-2 bg-white rounded-md shadow-md">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            value={updatedDeadline}
            onChange={(e) => setUpdatedDeadline(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={updatedChecked}
              onChange={() => setUpdatedChecked(!updatedChecked)}
              className="mr-2"
            />
            Completed
          </label>
          <input
            type="number"
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(Number(e.target.value))}
            min="1"
            max="5"
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{todo.title}</h3>
          <p className="text-gray-700">{todo.content}</p>
          <p className="text-gray-500">Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>
          <p className="text-gray-500">Priority: {todo.priority}</p>
          <p className="text-gray-500">Completed: {todo.checked ? 'Yes' : 'No'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mr-2 py-1 px-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
