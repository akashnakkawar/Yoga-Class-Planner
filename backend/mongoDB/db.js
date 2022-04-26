const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://akash:1234@cluster0.lie5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(error=>{
            console.error('connection error',error.message)
        })

const db= mongoose.connection

module.exports =db