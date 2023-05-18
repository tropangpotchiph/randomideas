const express = require('express');
const port = 5000;

const app = express();

const ideas = [
  {
    id: 1,
    text: "Growth is painful. Change is painful. But nothing is as painful asstaying stuck somewhere you don't belong",
    tag: 'Agriculture',
    username: 'Superman',
    date: '2017-01-02',
  },
  {
    id: 2,
    text: '“If you have good habits, time becomes your ally. All you need is patience',
    tag: 'Science',
    username: 'Ironman',
    date: '2019-03-05',
  },
  {
    id: 3,
    text: 'Within you is a stillness and a sanctuary to which you can retreat at any time and be yourself',
    tag: 'Physics',
    username: 'Victor Wenbanyama',
    date: '2013-04-08',
  },
];

//routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RandomIdeas API' });
});

//get all ideas
app.get('/api/ideas', (req, res) => {
  res.json({ success: true, data: ideas });
});

//get a single idea
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  res.json({ success: true, data: idea });
});

app.listen(port, () => console.log(`Server listening in port ${port}`));
