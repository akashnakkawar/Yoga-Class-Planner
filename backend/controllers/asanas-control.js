const Asanas = require('../models/asanas')


createAsanas = async (req,res)=>{
    const body = req.body
    const a = new Asanas(body)

    if(!a){
        return res.status(400).json({
            success: false,
            error: 'please enter all details'
        })
    }

    
       a.save()
        .then(()=>{
            return res.status(201).json({
                success:true,
                id:a._id,
                message:'image uploaded..'
            })
        })
        .catch(error =>{
            console.log(error);
            return res.status(400).json({
                error,
                success:false,
                message: 'image not uploaded..'
            })
        })

}

getAsanas = async (req,res) =>{
    await Asanas.find({},(error,c)=>{
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

getAsanasById = async (req,res) =>{
    
    await Asanas.findOne({_id:req.body.aid},(err,a)=>{
        if(err){
            console.log(err)
        }

         return res.status(200).json({success:true,asanas:a})
        })
        
        

    
    .catch(error=>{
        console.log(error)
    })
}

module.exports = {
    createAsanas,
    getAsanas,
    getAsanasById,
}