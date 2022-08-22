const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
// const path = require("path");

console.log('server init');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/rmsdb', {
    useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // for accessing req.body data

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);


//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    // console.log('process env', process.env);
    // console.log('process env', process.env.MONGO_URI);
});