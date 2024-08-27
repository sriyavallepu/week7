const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const userController = require('./controllers/userController'); // Adjusted path, assuming controllers folder is in the same directory as app.js

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => console.log('Error in connecting to the database'));
db.once('open', () => console.log('Connected to the database'));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/signup_successful.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/signup_successful.html', userController.signUp);

app.get('/signup_successful.html', userController.signupSuccessful);

// New route to add two numbers
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req, res, next) {
    var firstNumber = parseInt(req.params.firstNumber);
    var secondNumber = parseInt(req.params.secondNumber);
    var result = firstNumber + secondNumber || null;
    
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        res.status(400).json({ result: null, statusCode: 400 });
    } else {
        res.status(200).json({ result: result, statusCode: 200 });
    }
});

// Start the server and listen on port 3001
const port = 3001;
app.listen(port, () => {
    console.log('Listening to port ' + port);
});
