const express = require('express');
const router = express.Router();

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

//get all ideas
router.get('/', (req, res) => {
  res.json({ success: true, data: ideas });
});

//get a single idea
router.get('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }
  res.json({ success: true, data: idea });
});

//Add an idea
router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };
  // console.log(idea);
  ideas.push(idea);
  res.json({ success: true, data: idea });
});

//Update Idea
router.put('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;

  res.json({ success: true, data: idea });
});

//Delete idea
router.delete('/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  res.json({ success: true, data: idea });
});

module.exports = router;
