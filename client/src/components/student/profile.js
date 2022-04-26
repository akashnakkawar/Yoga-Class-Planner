import React from "react";
import api from '../../api/api'
import ReactHtmlParser from 'react-html-parser';
import apis from "../../api/api";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            student:'',
            problems:[],
            positions:[],
            msg:'',
            keys:'',
            temp:'',
            
        }
    }

    handlePositions=(e)=>{
        var position = this.state.keys[0];
        console.log(position.position)
        const {name} =e.target
        // this.setState({[name]:value})
        var dir = this.state.positions;
        
        if(dir.includes(name)){
            
            dir = dir.filter(arrayItem => arrayItem !== name);
        }
        else{
        
            dir.push(name)
        }
        this.setState({positions:dir})
       
      
    }

    handleProblem =(e)=>{

        const {name} =e.target
        var dir = this.state.problems;
        
        if(dir.includes(name)){
            
            dir = dir.filter(arrayItem => arrayItem !== name);
        }
        else{
        
            dir.push(name)
        }
        this.setState({problems:dir})
        
       

    }
    handleUpdate = () =>{
        var s = this.state.student;
        s.preferences.positions=this.state.positions;
        s.preferences.problems=this.state.problems; 
        console.log(s.preferences.problems)  ;     
        var id =s._id;
        var data = s;
        apis.updatePreferences({id,data}).then(res=>{
            this.setState({msg:'<div class="alert alert-success" role="alert">Preferences are updated.. <br/> These will be effected in a while..</div>'})
            setTimeout(()=>{
                this.setState({msg:''})
            },3000)
        })
        .catch(e=>console.log(e))
    }

    handleChange=(e)=>{
        
        var name = e.target.name;
        var s = this.state.student;
        s[name] = e.target.value;
        this.setState({student:s})
        
    }

    componentDidMount=()=>{
        var id = this.props.data.student._id;
        api.findstudentbyid({id}).then(res=>{
           
            this.setState({student:res.data.data,
                            problems:res.data.data.preferences.problems,
                            positions:res.data.data.preferences.positions,
                            temp:res.data.data
            
                        })
            
        })
        .catch(e=>console.log(e));
        api.getSearch().then((res)=>this.setState({keys:res.data.data}))
                            .catch(e=>console.log('error ',e))
    }
    render(){

        var name = this.state.student.name;
        var email = this.state.student.email;
        var pos = this.state.positions;
        var prob = this.state.problems;
        var position_data = this.state.keys;
        var position;
        var contraindications =[];
        if(position_data){
            position = position_data[0].position;
            contraindications=position_data[0].contraindications

            
        }
        
    
        
        return(
            <div className="profile">
                    <h3>Hello {this.state.temp.name},</h3> <br/>
                    <h5>Update your detais and preferences</h5> <br/>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name ="name" value={name}  onChange={this.handleChange}/>
                            
                        </div> <br/>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name ="email" value={email} onChange={this.handleChange} />
                            
                        </div> <br/>
                        <label>Select your yoga position preferences: </label> <br/> <br/>
                        {position && position.map(a=>{
                        return (
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" name={a}  checked={pos.includes(a)}  onChange={this.handlePositions}/>
                            <label class="form-check-label" for="inlineCheckbox1">{a}</label>
                        </div>
                        )
                         })}
                        
                        <br/> <br/>

                       
                            <label>Select your Contradications: </label> <br/> <br/>
                            {contraindications && contraindications.map(a=>{
                        return (
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" name={a}  checked={prob.includes(a)}  onChange={this.handleProblem}/>
                            <label class="form-check-label" for="inlineCheckbox1">{a}</label>
                        </div>
                        )
                         })}
                        
                        <br/>


                           



                        <br/> <br/>
                        <button type="button" class="btn btn-primary" onClick={this.handleUpdate}>Update</button>
                        </form> <br/>
                        {ReactHtmlParser(this.state.msg)}
                                    </div>
                                )
                            }
                        }
                        export default Profile;