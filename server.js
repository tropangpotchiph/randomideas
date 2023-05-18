const express = require('express');
const port = 5000;

const app = express();

//routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to RandomIdeas API ft. MasterJake of TropangCharat64',
  });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening in port ${port}`));
