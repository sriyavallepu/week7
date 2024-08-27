const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phno: String,
    gender: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
