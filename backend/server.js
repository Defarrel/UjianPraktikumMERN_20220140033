require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false); // Atau true, sesuai kebutuhan Anda
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Todo routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
