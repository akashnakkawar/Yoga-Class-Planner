const nodemailer = require('nodemailer')

//creating nodemailer objects

const transport = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user:"yogaclassplanner@hotmail.com",
        pass: "UniversityOfLeicester"
    }
});

module.exports =(options)=>{
    transport.sendMail(options,(err)=>{
        if(err){
            console.log(err);
            return;
        }
       
}
 )}