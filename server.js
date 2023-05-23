const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

//routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RandomIdeas API ft. MasterJake of TropangCharat64',
  });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening in port ${port}`));
