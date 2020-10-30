const mongoose = require("mongoose")

const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    budget: {
        type: Number,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true,
        trim:true,
        maxlength: 7,
        minlength: 7
    }
}, { collection: 'myBudget' })
module.exports = mongoose.model('myBudget', nameSchema)


// title budget backgroundColor