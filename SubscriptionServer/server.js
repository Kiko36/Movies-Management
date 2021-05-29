const express = require('express');
const cors = require('cors');

const membersController = require('./controller/membersController');
const moviesController = require('./controller/moviesController');
const subscriptionsController = require('./controller/subscriptionsController');

require('./config/database');
// require("./takeOutputData"); // first time setup

const app = express();
app.use(cors());
app.use(express.json());


app.use('/members', membersController)
app.use('/movies', moviesController)
app.use('/subscriptions', subscriptionsController)

const PORT  = process.env.PORT || 8000;
app.listen(PORT);

console.log("Subs Server is Up & Ready to Launch !!")