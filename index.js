import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));  // <-- This serves static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database');

const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to the database"));

// Route to handle sign-up form submissions
app.post("/sign_up", (req, res) => {
    const { name, age, email, phno, gender, password } = req.body;

    const data = {
        name,
        age,
        email,
        phno,
        gender,
        password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error in saving data.");
        }
        console.log("Record inserted successfully");
        return res.redirect('signup_successful.html');
    });
});

// Start the server and listen on port 3001
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});