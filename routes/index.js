const auth = require('./auth');
const category = require('./category');
const subcategory = require('./subcategory');
const user = require('./user');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    // app.get('/', (req, res) => {
    //     res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    // });
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/category', authenticate, category);
    app.use('/api/subcategory', authenticate, subcategory);
};
