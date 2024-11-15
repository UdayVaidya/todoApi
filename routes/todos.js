const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// POST /todos - Create a new to-do
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = new Todo({ title, description });
    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating to-do:', error);  // Log the error
    res.status(500).json({ error: 'Failed to create to-do item', details: error.message });
  }
});


// GET /todos - Retrieve all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch to-do items' });
  }
});

// GET /todos/:id - Retrieve a to-do by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });

    if (!todo) {
      return res.status(404).json({ error: 'To-do item not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the to-do item' });
  }
});

// PUT /todos/:id - Update a to-do by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    console.log(`Updating to-do with ID: ${req.params.id}`);

    // Optional: Check if ID is valid (if it's a number, for example)
    const isValidId = !isNaN(req.params.id);
    if (!isValidId) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.params.id },  // Query by custom 'id'
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'To-do item not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating to-do:', error);  // Log error details
    res.status(500).json({ error: 'Failed to update the to-do item' });
  }
});


// DELETE /todos/:id - Delete a to-do by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id: req.params.id });

    if (!deletedTodo) {
      return res.status(404).json({ error: 'To-do item not found' });
    }

    res.status(200).json({ message: 'To-do item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the to-do item' });
  }
});



module.exports = router;
