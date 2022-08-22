const User = require("../models/user.model");

// @route POST /auth/register
// @desc Register user
// @access Public

exports.register = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) return res.status(401).json({message: 'Email already exists.'});

            const newUser = new User(req.body);
            newUser.save()
                .then(user => {
                    console.log('adding user ', req.body);
                    return res.status(200).json({token: user.generateJWT(), user: user})
                })
                .catch(err => res.status(500).json({message:err.message}));
        })
        .catch(err => res.status(500).json({success: false, message: err.message}));
}

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    console.log('login email => ',req.body.email);
    console.log('login password => ',req.body.password);
    User.findOne({email: req.body.email})
        .then(user => {
            console.log('user found is ', user);
            if (!user) return res.status(401).json({msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //validate password
            if (!user.validPassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message: err.message}));
};
