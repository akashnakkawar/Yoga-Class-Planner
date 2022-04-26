const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Search = new Schema(
    {
       
        benefits:{type:[String],required:true},
        position:{type:[String],required:true},
        contraindications:{type:[String],required:true},
    },
    {   timestamps: true},
)

module.exports = mongoose.model('search',Search)