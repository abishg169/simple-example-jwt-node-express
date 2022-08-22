const express = require('express');
const router = express.Router();
let Category = require('../models/category.model');

router.route('/add').post((req, res) => {
    const category = {
        name: req.body.name
    };
    const newCategory = new Category(category);
    newCategory.save()
    .then(() => res.status(200).json('Add Successfully'))
    .catch(e => {
        res.status(400).json(e);
    })
});

router.route('/list').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/delete').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => res.json('Category deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').patch((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.name = req.body.name;
            category.save()
        .then(() => res.json('Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
