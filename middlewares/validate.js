const {check, validationResult} = require('express-validator');

const userSignUpValidationRules = () => {
    return [
        check("fullName", "Name is required").not().isEmpty(),
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("password", "Please enter a password with 4 or more characters")
        .not()
        .isEmpty()
        .isLength({ min: 4 }),
    ];
};

const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var messages = [];
      errors.array().forEach((error) => {
        messages.push(error.msg);
      });
      return res.status(422).json(errors);
    }
    next();
};

module.exports = {
  userSignUpValidationRules,
  validateSignup,
};