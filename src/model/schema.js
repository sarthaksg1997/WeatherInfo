const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    feedback:{
        type: String,
        required: true,
    },
});

const Suggestion = new mongoose.model("Suggestion",userSchema);

module.exports = Suggestion;