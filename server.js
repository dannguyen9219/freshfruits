///////////////////////////////////
////// Import Dependencies ///////
/////////////////////////////////
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const fruitController = require('./controllers/fruits.js');
const path = require('path'); // use this to link your resume


///////////////////////////////////////////////////////////////////////////////////
////// Create our Express Application Object Bind Liquid Templating Engine ///////
/////////////////////////////////////////////////////////////////////////////////

const app = express(); // App Object Setup - very important
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

//////////////////////////////
/////// Middleware //////////
////////////////////////////
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//////////////////////////
/////// Routes //////////
////////////////////////

// Listening Route //
app.get('/', (req, res) => {
    res.send(`Your server is running at the moment.`)
});

app.use('/fruits', fruitController);

///////////////////////////////////
/////// Server Listener //////////
/////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));