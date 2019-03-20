var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PersonDB');

var personSchema = mongoose.Schema({
    name: {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
    },
    phone: String
});

var Person = mongoose.model("Persons", personSchema);

module.exports = Person;