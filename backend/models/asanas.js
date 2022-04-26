const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Asanas = new Schema(
    {
       
        url:{type:String,required:true},
        title:{type:String,required:true},
        steps:{type:String,required:true},
        benefits:{type:[String],required:true},
        position:{type:[String],required:true},
        contraindications:{type:[String],required:true},
        students:{type:[Object],required:false},
        
    },
    {   timestamps: true},
)

module.exports = mongoose.model('asanas',Asanas)