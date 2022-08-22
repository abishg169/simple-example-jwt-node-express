const express = require('express');
const router = express.Router();
let SubCategory = require('../models/subcategory.model');

router.route('/add').post((req, res) => {
    const subCategory = {
        name: req.body.name,
        category: req.body.category
    };
    const newSubCategory = new SubCategory(subCategory);

    console.log('category', newSubCategory)
    newSubCategory.save()
    .then(() => res.status(200).json('Add Successfully'))
    .catch(e => {
        res.status(400).json(e);
    })
});

router.route('/list').get((req, res) => {
    SubCategory.find()
        .then(subcategories => res.json(subcategories))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/list?category=:categoryId').get((req, res) => {
    SubCategory.find()
        .then(subcategories => {
            res.json(subcategories)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    SubCategory.findById(req.params.id)
        .then(subcategory => res.json(subcategory))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/delete').delete((req, res) => {
    SubCategory.findByIdAndDelete(req.params.id)
        .then(subcategory => res.json('SubCategory deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').patch((req, res) => {
    SubCategory.findById(req.params.id)
        .then(subcategory => {
            subcategory.name = req.body.name;
            subcategory.category = req.body.category;
            subcategory.save()
        .then(() => res.json('SubCategory updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
