import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editTodo, onEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setCompleted(editTodo.completed);
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description, completed };
    if (editTodo) {
      onEdit(editTodo.id, todo);
    } else {
      onSubmit(todo);
    }
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
      <h4 className="text-center mb-4">{editTodo ? 'Edit To-Do' : 'Add a New To-Do'}</h4>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter to-do title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter a brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <label className="form-check-label">Mark as Completed</label>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {editTodo ? 'Update To-Do' : 'Add To-Do'}
      </button>
    </form>
  );
};

export default TodoForm;
