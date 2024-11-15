const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },  // Custom `id` field
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true } // Prevent MongoDB from creating its own `_id` field
);

// Middleware to auto-generate `id` if not provided
todoSchema.pre('validate', async function (next) {
  if (!this.id) {
    // Generate a unique incremental ID
    const lastTodo = await mongoose.model('Todo').findOne().sort('-id');
    this.id = lastTodo ? lastTodo.id + 1 : 1;
  }
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
