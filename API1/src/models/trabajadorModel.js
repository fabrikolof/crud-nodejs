const mongoose = require('mongoose');
const trabajadorSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    salary:{
        type: Number,
        required: false
    },
    country:{
        type: String,
        required: true
    },
    maximumSalary:{
        type: Number,
        required: false
    },
    minimumSalary:{
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('trabajador', trabajadorSchema);