const express = require('express');
const cors = require('cors');
const userController = require('./controller/userController');
const membersController = require('./controller/memberController');
const moviesController = require('./controller/moviesController');
const subscriptionsController = require('./controller/subscriptionsController');
require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', userController)
app.use('/members', membersController)
app.use('/movies', moviesController)
app.use('/subscriptions', subscriptionsController)

const PORT  = process.env.PORT || 3001;
app.listen(PORT);
console.log("Cinema Server is Up & Ready to Launch !!")