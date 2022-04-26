import React from 'react';
import api from '../../api/api';


class Class extends React.Component{
    constructor(props){
        super(props);
        this.state={
            classes:'',
            loadingMsg:'',
            test:'',
            msg:'',
            student:'',
        }
    }
    bookclass= async (c)=>{
        
        const payload={
            "student":this.state.student,
            "class":c,

        }

        await api.bookclass(payload)
                    .then(res=>{
                        console.log("success",res)
                        if(res.data.success){
                            this.setState({msg:'class has been booked...'})
                            setTimeout(()=>{
                               this.setState({msg:""})
                           },4000)
                        this.updateCapacity(payload)
                    }
                    else{
                        this.setState({msg:'you already booked this class..'})
                        setTimeout(()=>{
                            this.setState({msg:""})
                        },4000)
                    }
                    })
                    .catch(error=>{
                        console.log(error)
                    })
        
    }

    updateCapacity= async c =>{
       
        await api.updateCapacity(c)
                        .then(res=>console.log(res.status))
                        .catch(e=>{
                            console.log(e);
                        })
    }

    componentDidMount=async ()=>{

       var id =  this.props.data.student._id;
       await api.findstudentbyid({id})
                    .then((res)=>{
                        this.setState({student:res.data.data})
                    })
       
       await api.findClass()
                    .then(res=>{
                        if(res.status===200){
                        this.setState({classes:res.data.data})
                        }
                        else
                        {
                           
                            this.setState({loadingMsg:'no classes found'})
                            setTimeout(()=>{
                                this.setState({loadingMsg:''})
                            },3000)
                        }
                    })
                    .catch(error=>{
                        console.log(error)
                        this.setState({loadingMsg:'error occured while fetching details..'})
                    })
        
    
         
      
    }
    
    render(){
          
          const data = this.state.classes
          if(!data){
              return <h3><br/><br/>No classes found..</h3>
          }
          return(
              

              <div >
                  <br/><h3 style={{color:'green'}}>{this.state.msg}</h3><br/>
                  <br/>{this.state.loadingMsg}<br/>
                  <h3>Available classes are listed below:</h3>
                  <div class="row">
                         

                         <div style={{overflowY: 'scroll', height:'700px'}}>
                  {
                      Object.keys(data).map((item)=>{
                           return <div style={{border:'1px solid',padding:'10px',marginTop:'30px', boxShadow:'5px 10px #888888', width:'300px'}} key={item._id}>
                             <p>
                                  Date: {data[item].date.slice(0,10)} <br/>
                                   Start Time: {data[item].startTime} &nbsp; &nbsp; End time: {data[item].endTime} <br/>
                                   capacity: {data[item].capacity} <br/>
                                   capacity Left:{data[item].capacityLeft} <br/>
                                   {data[item].capacityLeft>0?<button type="button" class="btn btn-success" onClick={()=>this.bookclass(data[item])}>Book</button>: <button type="button" class="btn btn-success" disabled={true} style={{backgroundColor:'gray'}}>Book</button>}
                                  
                                 

                                    
                              
                              </p>
                              </div>
                      })
                  }
                  </div>




                       
                       
                  </div>
                 
                  
              </div>
            
          )
        
    }
}

export default Class;