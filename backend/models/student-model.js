const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        gender: {type: String, required: true},
        age: {type: Number, required: true},
        preferences: {type: Object,required:true},
        bookedclasses:{type:[Object],required: false},
        favourite:{type:[Object],required:false},
        
        
    },
    {   timestamps: true},
)

module.exports = mongoose.model('student',Student)