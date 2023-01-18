const express = require('express');
const router = express.Router();
const Food = require('../models/food');

//create one
router.post('/', async (req, res) => {
  const food = new Food({
    name: req.body.name,
    calorie: req.body.calorie,
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get many by name
router.get('/name/:name', async (req, res) => {
  try {
    const foods = await Food.find({
      name: { $regex: '.*' + req.params.name + '.*' },
    });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one by id
router.get('/id/:id', getFood, (req, res) => {
  // res.send(req.params.id);
  res.send(res.food);
});

//update one by id
router.patch('/id/:id', getFood, async (req, res) => {
  if (req.body.name != null) {
    res.food.name = req.body.name;
  }

  if (req.body.calorie != null) {
    res.food.calorie = req.body.calorie;
  }

  try {
    const updateFood = await res.food.save();
    res.json(updateFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete one by id
router.delete('/id/:id', getFood, async (req, res) => {
  try {
    await res.food.remove();
    res.json({ message: 'deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getFood(req, res, next) {
  let food;
  try {
    food = await Food.findById(req.params.id);
    if (food === null) {
      return res.status(400).json({ message: 'cannot find' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  res.food = food;

  next();
}

module.exports = router;
