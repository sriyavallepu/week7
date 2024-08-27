const User = require('../models/userModel');

exports.signUp = (req, res) => {
    const { name, age, email, phno, gender, password } = req.body;

    const newUser = new User({
        name,
        age,
        email,
        phno,
        gender,
        password
    });

    newUser.save((err) => {
        if (err) {
            console.log('Error saving user:', err);
            return res.status(500).send('Error saving user');
        }
        res.redirect('/signup_successful');
    });
};

exports.signupSuccessful = (req, res) => {
    res.render('signup_successful'); // Renders the signup_successful.ejs file
};
