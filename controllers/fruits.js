const express = require('express');
const Fruit = require('../models/fruit.js');

// Create Router //
const router = express.Router('../models/fruit');

// Seed Route //
router.get('/seed', (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]
    // Delete all fruits //
    Fruit.deleteMany({}).then((data) => {
        // Seed starter fruits //
        Fruit.create(startFruits).then((data) => {
            // send created fruits as response to confirm creation //
            res.json(data);
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
});

// Index Route //
router.get('/', (req, res) => {
    // find all fruits
    Fruit.find({})
        // render a template after they are found
        .then((fruits) => {
            res.render('fruits/Index', { fruits })
        })
        .catch((error) => {
            res.json({ error });
        })
});

// New Route //
router.get('/new', (req, res) => {
    res.render('fruits/New')
});

// Delete Route //
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Fruit.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/fruits')
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
});

// Update //
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedFruit) => {
            res.redirect(`/fruits/${updatedFruit._id}`)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
});

// Create //
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.create(req.body)
        .then((createdFruit) => {
            res.redirect(`/fruits/${createdFruit._id}`)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
});

// Edit //
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Edit', { fruit })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
});

// Show Route //
router.get('/:id', (req, res) => {
    const { id } = req.params

    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Show', { fruit })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
});

module.exports = router;