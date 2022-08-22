const express = require('express');
const {check} = require('express-validator');
const Auth = require('../controllers/authController');
const {
    userSignUpValidationRules,
    validateSignup,
} = require("../middlewares/validate");

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
// });

router.post('/register', [
    userSignUpValidationRules(),
    validateSignup
], Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], Auth.login);

module.exports = router;