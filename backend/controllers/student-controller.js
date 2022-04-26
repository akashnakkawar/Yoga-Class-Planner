const Student = require('../models/student-model')
const mail = require('../mail/mail')


insertStudent = async (req,res)=>{
    const body = req.body
    const data =[];

    const student = new Student(body)

    if(!student){
        return res.status(400).json({
            success: false,
            error: 'please enter all details'
        })
    }
    
    var isMail = await Student.findOne({email:student.email})
    if(isMail){
        return res.status(200).json({
            success: false,
            error: 'email id present already'
        })
    }

   
    console.log(data, ' outside')
    student
        .save()
        .then(()=>{
            const options={
                from: "yogaclassplanner@hotmail.com",
                to :req.body.email,
                subject:"Yoga class planer Registration confirmation",
                text:"thank you.. for registering with us.."

            };

            mail(options);

            return res.status(201).json({
                success:true,
                id:student._id,
                student:'yes',
                message:'details are inserted..'
            })
        })
        .catch(error =>{
            return res.status(400).json({
                error,
                student,
                success:false,
                message: 'details are not inserted'
            })
        })

}

findStudent = async (req,res) =>{
    await Student.findOne({$and: [{email:req.body.email},{password:req.body.password}]},(error,student)=>{
        if(error){
            return res.status(400).json({success: false, token: 'false',data:null})
        }

        return res.status(200).json({success:true, token: 'yes',student:'yes',data:student})
    })
}

updataFavourite = async (req,res) =>{
    const asana = req.body.data;
    const id = req.body.id;
    Student.updateOne({_id:id},{$set:{favourite:asana}},(err)=>{
        if(err){
            console.log(err)
            return res.status(400).json({success:false})
        }
        return res.status(200).json({success:true})
    })
}

favourite = async (req,res) =>{
    const asana = req.body.data
    
    const id = req.body.id
    Student.findOne({_id:id},{favourite:{$elemMatch : {_id:asana._id}}},(err,s)=>{
        if(err){
            console.log(err)
        }
        if(Object.keys(s.favourite).length===0){
            Student.updateOne({_id:id},{$push:{favourite:asana}},()=>{})
            return res.status(200).json({s:true})
        }
        else{
            return res.status(200).json({s:true})
        }
    })
    .catch(e=>{
        console.log(e)
    })
    // await Student.findOne({_id:id},(error,student)=>{
    //     if(error){
    //         return res.status(400).json({success: false, token: 'false',data:null})
    //     }
    //     console.log(student)
    //     return res.status(200).json({success:true, token: 'yes',student:'yes',data:student})
    // })
    

 }

findStudentById = async (req,res)=>{
   
    var id = req.body.id;
    
    Student.findOne({_id:id},(err,student)=>{
        if(err){
            console.log('error occured ',err);
            return res.status(400).json({success:false})
        }
        
        return res.status(200).json({success:true,data:student})
    })
}


     


updatePreferences = async (req,res) =>{
   
    var positions = req.body.data.preferences.positions
    var name = req.body.data.name;
    var email = req.body.data.email;
    var problems = req.body.data.preferences.problems;
    var pref = {positions,problems}
    
 
    await Student.updateOne({_id:req.body.id},{$set :{preferences:pref,name:name,email:email}},(error)=>{
        if(error){
            console.log('error',error)
            return res.status(400).json({success: false,error:error})

        }
       
        return res.status(200).json({success: true})

    })
}




bookclass = async (req,res)=>{

    var student = req.body.student
    var c=req.body.class
    var booked =[]
    Student.findOne({_id:student._id},(err,s)=>{
        if(err){
            console.log(err)
        }
        booked=s.bookedclasses
        if(Object.keys(booked).length<1){
            
            Student.updateOne({_id:student._id},{$set:{bookedclasses:c}},(error)=>{
                if(error){
                    console.log('error is ',error)
                    return res.status(400).json({success: false,error:error})
                }
                
                return res.status(200).json({success: true,isPresent:false})


            })
        
        }
        else{
            
            Student.findOne({_id:student._id},{bookedclasses:{$elemMatch : {_id:c._id}}},(err,s)=>{
                if(err){
                    console.log(err)
                }
                if(Object.keys(s.bookedclasses).length===1){

                    
                   
                    return res.status(200).json({success: false,isPresent:true})
                }
                else{
                    
                    
                     Student.updateOne({_id:student._id},{$push:{bookedclasses:c}},()=>{})
                                      
                     return res.status(200).json({success: true,isPresent:false})

                }


             } )
        }
       
        

    })
    
  
    // console.log('lenght of object is;', Object.keys(booked).length)
    // var present;
    // if(Object.keys(booked).length<1){
    //     Student.updateOne({_id:student._id},{$set:{bookedclasses:c}},(err)=>{
    //         if(err)
    //         {
    //             console.log(err)
    //         }
           
    //     }) 
    //     .catch(e=>{
    //         console.log(e)
    //     }) 
    // }
    // else{

    //     await Student.findOne({_id:student._id},{bookedclasses:{$elemMatch : {_id:c._id}}},(err,s)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         present =s;
            
    
    //     })
        
    //     if(present){
            
    //         return res.status(200).json({isPresent:true})
    //     }
    //     else{

    //         await  Student.updateOne({_id:student._id},{$push:{bookedclasses:c}},(err,res)=>{
    //                     if(err)
    //                     {
    //                         console.log(err)
                            
    //                     }
                        
                        
    //                 })  
    //                 .catch(error=>{
    //                     console.log(error)
    //                 })

    //                 return res.status(200).json({isPresent:false,msg:'success booked..'})


    //     }
    // }
    
    

}

module.exports = {
    insertStudent,
    findStudent,
    updatePreferences,
    bookclass,
    favourite,
    findStudentById,
    updataFavourite,
}