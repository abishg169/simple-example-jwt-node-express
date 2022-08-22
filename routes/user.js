const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route('/list').get((req, res) => {
    User.find()
        .then(users => {
            const list = []
            users.forEach(user => {
                const obj = {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                }
                list.push(obj)
            })
            return res.status(200).json(list);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/delete').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("User deleted successfully"))
        .catch(e => res.status(400).json(e));
})

module.exports = router;
