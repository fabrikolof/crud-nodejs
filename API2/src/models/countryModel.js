const mongoose = require('mongoose');
const countrySchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    maximumSalary:{
        type: Number,
        required: true
    },
    minimumSalary:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('country', countrySchema);