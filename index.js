const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todos');
const cors = require('cors');

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
