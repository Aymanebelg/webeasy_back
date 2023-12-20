const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors"); // Add this lineconst app = express();
const port = 5000;
const app=express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB using the provided connection string
mongoose.connect('mongodb+srv://aymanebelghacham:aymaneleo2001@cluster0.qkx9ud3.mongodb.net/TodoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});


// Mongoose models for users and tasks
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  // Add other task-related fields as needed
});

const Task = mongoose.model('Task', taskSchema);

// Your existing route handlers for tasks go here

// Start the server
// This part is moved inside the successful MongoDB connection block
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
