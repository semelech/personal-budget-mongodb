const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        minlength: 6,
        uppercase: true,
        required: true,
    }
}, { collection: 'budget' });

module.exports = mongoose.model('budget', budgetSchema)