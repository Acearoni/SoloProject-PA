//This is where we would create what we need. Do this first as a Controller interacts with the model. 

const mongoose = require("mongoose");
const SnackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Snack Name is Required'],
        min:[5, 'Snack Must Be At Least 5 Characters Long'],
        max:[15,'Snack Name Must Be Less Than 16'],
    },

    price: {
        type: Number,
        required: [true, 'A price is required.'],
        minLength: [1, 'Patient Name Must Be At Least 1 Character Long'],
        maxLength: [40, 'Must Not Be Longer Than 40 Characters']

    },

    code: {
        type: String,
        required: [true, 'Code Is Required'],
        unique: true, //This makes sure the code is unique.
        uppercase: true //This makes sure that the code is converted to uppercase.
    },

    //_id gets created everytime we create something new. Not needed within the schema

    //Timestamps is our created and updated at.
}, {timestamps:true})

module.exports = mongoose.model('Snack', SnackSchema);
