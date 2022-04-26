const Teacher = require('../models/teacher-model')
const mail = require('../mail/mail')

insertTeacher = async (req,res)=>{
    const body = req.body

    const teacher = new Teacher(body)

    if(!teacher){
        return res.status(400).json({
            success: false,
            error: 'please enter all details'
        })
    }

    teacher
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
                id:teacher._id,
                message:'details are inserted..'
            })
        })
        .catch(error =>{
            return res.status(400).json({
                error,
                success:false,
                message: 'details are not inserted'
            })
        })

}


updateTeacherProfile = async (req,res) =>{
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    await Teacher.updateOne({_id:id},{$set:{name:name,age:age,email:email}},(err)=>{
        if(err)
            return res.status(400).json({success:false})
        return res.status(201).json({success:true})
    })
}

findTeacher = async (req,res) =>{
    await Teacher.findOne({$and: [{email:req.body.email},{password:req.body.password}]},(error,teacher)=>{
        if(error){
            return res.status(400).json({success: false, token: 'false',data:null})
        }

        return res.status(200).json({success:true, token: 'yes',teacher:'yes',data:teacher})
    })
}


directory = async (req,res) =>{
    var teacher = req.body.teacher
    var c=req.body.d
    var date = new Date();
    var name = req.body.name;
    var payload ={name,date,c}
    Teacher.updateOne({_id:teacher},{$push:{directory:payload}},(error)=>{
        if(error){
            console.log(error)
            return res.status(400).json({success: false,error:error})
         }
                
        return res.status(200).json({success: true})

            

    })
}

bookclass = async (req,res)=>{

    var teacher = req.body.teacher;
    var c=req.body.c
    var booked =[]

  
    Teacher.findOne({_id:teacher},(err,t)=>{
        if(err){
            console.log(err)
        }
        booked=t.bookedclasses
        if(Object.keys(booked).length<1){
            
            Teacher.updateOne({_id:teacher},{$set:{bookedclasses:c}},(error)=>{
                if(error){
                    console.log('error is ',error)
                    return res.status(400).json({success: false,error:error})
                }
                
                return res.status(200).json({success: true,isPresent:false})


            })
        
        }
        else{
            
            Teacher.findOne({_id:teacher},{bookedclasses:{$elemMatch : {_id:c._id}}},(err,s)=>{
                if(err){
                    console.log(err)
                }
                if(Object.keys(s.bookedclasses).length===1){

                    
                   
                    return res.status(200).json({success: false,isPresent:true})
                }
                else{
                    
                    
                     Teacher.updateOne({_id:teacher},{$push:{bookedclasses:c}},()=>{})
                                      
                     return res.status(200).json({success: true,isPresent:false})

                }


             } )
        }
       
        

    })

}

findTeacherById= async (req,res) =>{
    id = req.body.id;
    Teacher.findOne({_id:id},(err,teacher)=>{
        if(err){
            console.log(err);
            return res.status(400).json({success:false})
        }
        
        return res.status(200).json({success:true,directory:teacher});
    })
}

deleteDirectory =(req,res)=>{
   
    var id = req.body.id;
    var data = req.body.data;
    Teacher.updateOne({_id:id},{$set:{directory:data}},(err)=>{
        if(err) console.log(err);
        return res.status(200).json({success:true})
    })
    
}

module.exports = {
    insertTeacher,
    findTeacher,
    bookclass,
    directory,
    findTeacherById,
    deleteDirectory,
    updateTeacherProfile
}