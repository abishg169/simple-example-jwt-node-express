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
        .then(subcategories => {
            console.log('searching for category id = ', req.query
            .category);
            console.log('subcategories = ', subcategories);
            if (req.query.category) {
                const list = []
                subcategories.forEach(data => {
                    console.log(`data ${data.category} = ${req.query.category}`, data.category == req.query.category)
                    if (data.category == req.query
                        .category) {
                        const obj = {
                            id: data.id,
                            name: data.name,
                            category: data.category,
                        }
                        list.push(obj)
                    }
                })
                return res.status(200).json(list);
            } else {
                const list = []
                subcategories.forEach(data => {
                    const obj = {
                        id: data.id,
                        name: data.name,
                        category: data.category,
                    }
                    list.push(obj)
                })
                return res.status(200).json(list);
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    SubCategory.findById(req.params.id)
        .then(subcategory => {
            const obj = {
                id: data.id,
                name: data.name,
                category: data.category,
            }
            return res.status(200).json(obj)
        })
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
