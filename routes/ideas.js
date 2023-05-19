const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');

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
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//get a single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Update Idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

module.exports = router;
