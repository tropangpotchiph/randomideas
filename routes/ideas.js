const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');

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
    const idea = await Idea.findById(req.params.id);

    //If username is a match
    if (idea.id === req.params.id) {
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
    }

    //usernames dont match
    res.status(403).json({
      success: false,
      error: ' You are not authorized to update this resource',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

//Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    //Match the username

    if (idea.username === req.params.id) {
      await Idea.findByIdAndDelete(req.params.id);
      res.json({ success: true, data: {} });
    }

    //If not match
    res.status(403).json({
      success: false,
      error: ' You are not authorized to delete this resource',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something Went Wrong' });
  }
});

module.exports = router;
