const express = require('express');
const apiRoute = require('./routes/apiRoute');
const htmlRoute = require('./routes/htmlRoute');

//initializing the application and creating the PORT
const app = express();
const PORT = process.env.PORT || 3001;

//creating the middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));

//setting up the routes
app.use('/api', apiRoute);
app.use('/', htmlRoute);

// Starting the server
app.listen(PORT, () => console.log (`Listenig on Port; ${PORT}`));
