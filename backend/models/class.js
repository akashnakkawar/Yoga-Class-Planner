const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Class = new Schema(
    {
        by: {type: String, required: true},
        date: {type: Date, required: true},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
        capacity: {type: Number, required: true},
        capacityLeft: {type: Number, require: true},
        students: {type:[Object],required: false},
        asanas:{type:[Object],required:false},
        
        
    },
    {   timestamps: true},
)

module.exports = mongoose.model('class',Class)