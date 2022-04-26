const Class = require('../models/class')

createClass = async (req,res)=>{
    const body = req.body

    const c = new Class(body)

    if(!c){
        return res.status(400).json({
            success: false,
            error: 'please enter all details'
        })
    }

    
       c.save()
        .then(()=>{
            return res.status(201).json({
                success:true,
                id:c._id,
                message:'class created..',
                c:c,
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

findClass = async (req,res) =>{
    await Class.find({},(error,c)=>{
        if(error){
            return res.status(400).json({success: false, error:error})
        }
        if (!c.length) {
            return res
                .status(404)
                .json({ success: false, error: `class not found` })
        }
       
        return res.status(200).json({ success: true, data: c })
    })
    .catch((e)=>{
        console.log(e)
    })
}

findClassById = (req,res) =>{
    id= req.body.id;
    Class.findOne({_id:id},(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({success:false,msg:'error happend'});
        }
        return res.status(201).json({success:true,result:result});
    }) 
    .catch(e=>console.log(e))
}

updateAsanas =(req,res)=>{
    var data = req.body.data;
    var id = req.body.a_id;
   
    Class.updateOne({_id:id},{$set:{asanas:data}},(err,r)=>{
        if(err)
        {
            return res.status(400).json({success:false})
        }
        
        return res.status(201).json({success:true,msg:'success'});
    })
    .catch(e=>console.log(e))
}

updateCapacity = (req,res)=>{

  
    var id = req.body.student._id;
    var preferences = req.body.student.preferences;
    var name = req.body.student.name;
    var payload = {id,name,preferences}
   
    Class.findOne({_id:req.body.class._id},(err,c)=>{
        if(err){
            console.log(err)
            return res.status(400).json({success:false})
        }
        if(c){
               var cL = c.capacityLeft-1
               Class.updateOne({_id:req.body.class._id},{$push:{students:payload},$set:{capacityLeft:cL}},(err,a)=>{
                   if(err){
                       console.log(err)
                       return res.status(400).json({success:false})
                   }
                   return res.status(201).json({success:true})
               })
        }
    })
    .catch(e=>{
        console.log(e)
    })
    
    
    
}


module.exports = {
    createClass,
    findClass,
    updateCapacity,
    findClassById,
    updateAsanas
}