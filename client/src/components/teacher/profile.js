import React from "react";
import apis from "../../api/api";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
           details:props,
           teacher:props.details.teacher,
           msg:'',
        }
    }
    handleChange=(e)=>{
        e.preventDefault();
       
        var name = e.target.name;
        var s = this.state.teacher;
        s[name] = e.target.value;
        this.setState({teacher:s})
       
        
    }
    handleUpdate=(e)=>{
         e.preventDefault();
         var id = this.state.teacher._id;
         var name = this.state.teacher.name;
         var age = this.state.teacher.age;
         var email = this.state.teacher.email;
         const payload = {id,name,age,email}
         apis.updateteacherprofile(payload).then(res=>{
             this.setState({msg:'details updated'})
             setTimeout(()=>{
                 this.setState({msg:''})
             },3000)
         })
    }
    
    render(){
        var teacher = this.state.teacher
        
        return(
            <div className="profile">
                <br/><br/>
                <h3>Hello {teacher.name},</h3>
                <p>If you wanna update details, please use below form</p>
                <form>
                <label>Name:</label> <br/> 
                <input 
                    type='text'
                    name='name'
                    
                    onChange={this.handleChange}
                   value={teacher.name}
                   
                    /> <br/>
                
                <label>Email id </label><br/>
                <input 
                    type='text'
                    name='email'
                    
                    onChange={this.handleChange}
                   value={teacher.email}
                   
                    /> <br/>
                
                
                <label>Age </label> <br/>
                <input 
                    type='text'
                    name='age'
                    
                    onChange={this.handleChange}
                   value={teacher.age}
                   
                    />
                <br/><br/>
               
               
                <button onClick={this.handleUpdate} >Update</button>
            </form>
            {this.state.msg}
            </div>
        );
    }
}
export default Profile;