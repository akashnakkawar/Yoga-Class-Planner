import React from 'react';
import apis from '../../api/api';


class Bookedclasses extends React.Component{
    constructor(props){
        super(props);
        this.state={
            classes:'',
            loadingMsg:'',
            test:'',
            msg:'',
            show:true,
            data:'',
 
        }
    }
    
    getdeatils= async (id)=>{
      
        this.setState({show:!this.state.show})
        apis.findclassbyid({id}).then(res=>{
            this.setState({data:res.data.result.asanas})
        })
        .catch(e=>console.log(e))

    }
    hidedeatils=()=>{
        this.setState({show:!this.state.show,data:[]})
    }
    componentDidMount=()=>{
      
        var id = this.props.data.teacher._id;
        apis.showdirectory({id}).then(res=>{
            
            this.setState({classes:res.data.directory.bookedclasses})
        })
        .catch(e=>console.log(e))
    }

    
    render(){
          
          const data = this.state.classes
          const asana = this.state.data
          const button ={true:'show ',flase:'hide'}
          if(!data){
              return <h3><br/><br/>No classe has been created..</h3>
          }
          return(
              

            <div class="container">
            <div class="row">
              <div class="col">
              <div >
                  <br/>{this.state.msg}<br/>
                  <h3>Available classes are listed below:</h3>
                  <div style={{overflowY: 'scroll', height:'700px'}}>
                  {
                      Object.keys(data).map((item)=>{
                           return <div style={{border:'1px solid',padding:'10px',marginTop:'30px', boxShadow:'5px 10px #888888', width:'300px'}} key={data[item]._id} >
                             <p >
                                  Date: {data[item].date.slice(0,10)} <br/>
                                   Strat Time: {data[item].startTime} &nbsp; &nbsp; End time: {data[item].endTime} 
                                 <button type="button" class="btn btn-info" onClick={()=>this.getdeatils(data[item]._id)}> show details </button>
                                   
                                   
                                   

                                    
                              
                              </p>
                              </div>
                      })
                  }
                  </div>
                  
              </div>
              </div>
              <div class="col">
              <br/>{this.state.msg}<br/>
                  <h3>Select the class to see the asana:</h3>
             <div style={{overflowY: 'scroll', height:'700px'}}>
                  
                  { asana.length!==0 &&
                      asana.map((item)=>{
                           return (
                               
                            <div classNameName="shadow-sm p-3 mb-5 bg-white rounded" style={{border:'1px solid',padding:'10px',marginTop:'30px', boxShadow:'5px 10px #888888',textDecoration:'none'}}>
                            <div className="container">
                            <div className="row">
                              <div className="col-sm">
                              <img src={item.url} className="rounded float-start" alt="..." style={{display: "block",maxWidth: "100%",padding:'10px', height: "auto"}}/>
                              </div>
                              <div className="col-sm">
                              <span className="align-middle">
                              <table style={{height: '100px'}}>
                                    <tbody>
                                            <tr>
                                            <td class="align-bottom"> <p className="h4">{item.title}</p></td>
                                            </tr>
                                    </tbody>
                                </table>
                             
                              </span>
                              </div>
                            </div>
                          </div>
                          </div>
                        
                           )

                      })
                  }
                  {(asana.length===0) && <h1>Teacher haven't added the asana to the class. </h1>}
                  </div>
              </div>
            </div>
            </div>
            
          )
        
    }
}

export default Bookedclasses;