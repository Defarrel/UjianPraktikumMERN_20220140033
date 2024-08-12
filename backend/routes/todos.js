const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET ALL TODOS
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Database failure' });
  }
});

// GET SINGLE TODO
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE TODO
router.post('/', async (req, res) => {
  const { title, content, deadline, checked, priority } = req.body;

  try {
    const newTodo = new Todo({
      title,
      content,
      deadline: deadline ? new Date(deadline) : null,
      checked: checked || false,
      priority: priority || 1,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ result: 1, todo: savedTodo });
  } catch (err) {
    res.status(400).json({ result: 0, error: err.message });
  }
});

// UPDATE TODO
router.put('/:id', async (req, res) => {
  const { title, content, deadline, checked, priority } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          content,
          deadline: deadline ? new Date(deadline) : null,
          checked,
          priority
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo updated', todo: updatedTodo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE TODO
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Database failure' });
  }
});

module.exports = router;
