import React from 'react';
import apis from '../../api/api';
import { Link } from 'react-router-dom';

class Favourite extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            student_id:'',
            msg:'',
            
        }
    }
    
    componentDidMount=()=>{
        // const payload ={props.data.student._id}
        // apis.findstudentbyid(payload)
        var id = this.props.data.student._id;
        const payload = {id}
        apis.findstudentbyid(payload).then(res=>{
            console.log(res.data.data.favourite);
            this.setState({data:res.data.data.favourite,student_id:res.data.data._id})
        })
        .catch(e=>console.log(e))
    }
    render(){
        var data =this.state.data
       
        if(data.length===0){
            return <h3>No favourite items added..</h3>
        }
        return ( 
            <div>
          
          <br/><br/>
            <h4>Favourite items are listed below: </h4>

             <div style={{overflowY: 'scroll', height:'700px'}}>
                  {
                      Object.keys(data).map((item)=>{
                           return (
                               <Link to={`/stu-dashboard/asanasdetails/${data[item]._id}/${this.state.student_id}`} style={{textDecoration:'none',color:'black'}}>
                            <div classNameName="shadow-sm p-3 mb-5 bg-white rounded" style={{border:'1px solid',padding:'10px',marginTop:'30px', boxShadow:'5px 10px #888888',textDecoration:'none'}}>
                            <div className="container">
                            <div className="row">
                              <div className="col-sm">
                              <img src={data[item].url} className="rounded float-start" alt="..." style={{display: "block",maxWidth: "100%",padding:'10px', height: "auto"}}/>
                              </div>
                              <div className="col-sm">
                              <span className="align-middle">
                              <table style={{height: '100px'}}>
                                    <tbody>
                                            <tr>
                                            <td class="align-bottom"> <p className="h4">{data[item].title}</p></td>
                                            </tr>
                                    </tbody>
                                </table>
                             
                              </span>
                              </div>
                              
                              <div className="col-sm">
                                <p classNameName="lead">
                                <table style={{height: '100px'}}>
                                    <tbody>
                                            
                                             <tr>

                                                <br/><br/><br/><br/>

                                                {/* <button type="button" class="btn btn-danger" onClick={()=>this.remove(data[item]._id)}>Remove from Favourites</button> */}
                                            
                                            </tr>
                                            <tr>
                                           
                                            </tr>
                                    </tbody>
                                </table>
                              
                                </p>
                              </div>
                            </div>
                          </div>
                          </div>
                          </Link>
                           )

                      })
                  }
                  </div>
            </div>
            
         );
    }
}

export default Favourite;