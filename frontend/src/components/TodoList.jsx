import React from 'react';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="row">
      {todos.map((todo) => (
        <div className="col-md-4 mb-4" key={todo.id}>
          <div className={`card shadow-sm ${todo.completed ? 'border-success' : 'border-warning'}`}>
            <div className="card-body">
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text text-muted">{todo.description}</p>
              <span
                className={`badge ${todo.completed ? 'bg-success' : 'bg-warning'} mb-2`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEdit(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
