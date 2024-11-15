import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const handleCreate = async (newTodo) => {
    try {
      await createTodo(newTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const handleUpdate = async (id, updatedTodo) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
      setEditTodo(null); // Switch back to "Add To-Do" mode
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do App</h1>
      <TodoForm 
        onSubmit={handleCreate} 
        editTodo={editTodo} 
        onEdit={handleUpdate} 
      />
      <h2 className="mt-4 mb-3">Your To-Dos</h2>
      <TodoList 
        todos={todos} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default App;
