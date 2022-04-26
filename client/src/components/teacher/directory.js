import React from 'react';
import api from '../../api/api';
import ReactHtmlParser from 'react-html-parser';

class Directory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            directory:'',
            data:'',
            show:'',
            count:0,
            list:[],
            msg:'',
            name:'',
        }
    }

    changeCount=(item)=>{
        let dir = this.state.list;
        let c = this.state.count;
        if(dir.includes(item)){
            c--;
            dir = dir.filter(arrayItem => arrayItem !== item);
        }
        else{
            c++;
            dir.push(item)
        }
        this.setState({list:dir});
        this.setState({count:c});
    }
    handleName=(e)=>{
        this.setState({name:e.target.value})
    }
    handleSubmit=()=>{
        let teacher= this.props.data.teacher._id;
        let d = this.state.list;
        let name = this.state.name;
        const payload = {teacher,d,name}
        api.directory(payload).then(res=>{
            if(res.status===200){
                this.setState({msg:'<div class="alert alert-success" role="alert"> <h3>Directory of asanas has been created... </h3> </div>'})
            }
            else{
                this.setState({msg:'<div class="alert alert-danger" role="alert">Error occured.. Try again later..</div>'})
            }
            setTimeout(()=>{
                this.setState({msg:''})
            },3000)
        })
    }
    componentDidMount=()=>{
        console.log(this.props.data.teacher._id)
        api.getAsanas().then(res=>{
            
            this.setState({data:res.data.data})
        })
    }

    render(){
        var data = this.state.data;
        if(!this.state.data){
            return <h1> Data has been loading..</h1>
        }
        return(
           <div className="directory">
               <div class="container">
                   <div className="row">
                   <br/><br/>
                    <br/><br/>
                    <br/><br/>
               
                {ReactHtmlParser(this.state.msg)}
                   </div>
                <div class="row">
                <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <div class="col">
                    
                    
                 <div style={{overflowY: 'scroll', height:'600px'}}>
                {
                      Object.keys(data).map((item)=>{
                           return (
                               
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
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{width:'20px',height:'30px'}} onChange={()=>this.changeCount(data[item])}/>
                                                </div>
                                            </tr>
                                    </tbody>
                                </table>
                              
                                </p>
                              </div>
                            </div>
                          </div>
                          </div>
                          
                           )

                      })
                  }
                  </div>
                  




                    </div>
                    <div class="col" style={{right:'0'}}>
                    <div>
                   
                  </div>
                    <br/><br/><br/><br/>
                    <h3>First select items on left side and then enter sequence name </h3>
                    <br/><br/>
                    <h4>{this.state.count} selected</h4>
                    <br/><br/>
                  <form class="form-inline">
                        
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">Enter sequence name:</label> <br></br>
                            <input type="text" class="form-control" id="sequencename" placeholder="sequence name" onChange={this.handleName}/>
                        </div>
                        <button type="button" class="btn btn-success" onClick={this.handleSubmit} disabled={this.state.count!==0 && this.state.name!==''?false:true}>Create sequence</button>
                        </form>
                    </div>
                </div>
                </div>
                 </div>
         
        )
    }

}
export default Directory;
