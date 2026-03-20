require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
