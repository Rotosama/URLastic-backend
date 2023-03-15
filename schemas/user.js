const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSchema = require("./urls");

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: (true, "You should write your name"),
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: (true, "You must write your last name"),
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: (true, "Write a valid email."),
    },
    password: String,
    phone: Number,
    birthDate: Date,
    
});

module.exports = mongoose.model("User", userSchema);
