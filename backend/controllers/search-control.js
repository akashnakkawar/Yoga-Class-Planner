const Search = require('../models/search');

manageSearch = async (req,res) =>{
   
    
    var benefits = []
    benefits=req.body.benefits.split(',');
    
    var position = []
    position=req.body.position.split(',');
    var contraindications = []
    contraindications= req.body.contraindications.split(',');
    benefits = benefits.map(a=>a.trim())
    position = position.map(a=>a.trim())
    contraindications = contraindications.map(a=>a.trim())
    Search.find({},(err,result)=>{
        if(err) {
            console.log(err)
        }
        
        if(result.length===0){
            const temp = {benefits,position,contraindications}
            const s = new Search(temp)
            s.save()
                .then(()=>{
                    return res.status(201).json({
                        success:true,
                    })
                })
                .catch(e=>console.log('error ',e))
            
        }
        else{
           
            
            
            let b = benefits.concat(result[0].benefits);
            let p = position.concat(result[0].position);
            let c = contraindications.concat(result[0].contraindications);
            
       
            
            b = [...new Set(b)];
            p = [...new Set(p)];
            c = [...new Set(c)];
          
            
            Search.updateOne({_id:result[0]._id},{$set:{benefits:b,position:p,contraindications:c}})
                                            .then(()=>{
                                                return res.status(201).json({
                                                    success:true,
                                                })
                                            })
            
        }
    })
    .catch(e=>console.log(e));
}

getSearch =async (req,res)=>{
    Search.find({},(error,result)=>{
        if(error) return res.status(400).json({success:false})
        return res.status(201).json({success:true,data:result})
    })
    .catch(e=>console.log(e))
}

module.exports ={
    manageSearch,getSearch
}