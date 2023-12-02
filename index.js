//initializing the express setup and port
const express = require('express');
const port = 8888;

//variable for using the express libraries
const app = express();
//exporting the routes file
const router = require('./routes/routes');
//exporting the mongoose config file
const db = require('./config/mongoose');
//variable for using the bodyParser
const bodyParser = require('body-parser');

// Using the built-in Express middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded());
//using the bodyParser for parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting up the routes using the router
app.use('/', router);

//starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});