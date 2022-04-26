import { Link} from "react-router-dom";
import { Redirect } from 'react-router';
import apis from '../api/api'
import React from "react";
import ReactHtmlParser from 'react-html-parser';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            errMsg:'',
            student:'',
            teacher:'',
            isStudent:false,
            isAdmin:false,
            
        }
    }
    
    handlepassword=(e)=>{
      
        var md5 = require('md5');
        var password = md5(e.target.value)
        this.setState({password:password})
    }
    handlechange = (e) =>{
        const {name,value} =e.target
        this.setState({[name]:value})
    
    }
    isStudent = ()=>{
         this.setState({isStudent:!this.state.isStudent})
         
    }
    handleLogin = async e =>{
        e.preventDefault();
        const {email,password} = this.state
        console.log(email,' ',password)
        if(email==='admin@gmail.com' && password==='21232f297a57a5a743894a0e4a801fc3'){
            this.setState({isAdmin:true})
            this.props.handle('','admin')
            
        }
        const payload = {email,password}
        var result;
        if(this.state.isStudent)
             result = await apis.findStudent(payload);
        else
             result =await apis.findTeacher(payload);

        
        if(email==="" || password==="")
        {
            this.setState({errMsg:"please fill all details..."});
            setTimeout(()=>{
                this.setState({errMsg:""});
            },3000);
        }
        else if(!result.data.data){
            this.setState({errMsg:'<div class="alert alert-danger" role="alert"> username or password is incorrect..! <br/>Please try again..</div>'});
            setTimeout(()=>{
                this.setState({errMsg:""});
            },3000);
        }
        else{
               if(this.state.isStudent){
                    this.setState({student:result.data.data})
                    this.props.handle(result.data.data,true);
               }
               else{
                 this.setState({teacher:result.data.data})
                 this.props.handle(result.data.data,false);

               }
               
        }

    }
    
    render(){
        if(this.state.isAdmin){
            return <Redirect to="/admin" />
        }
        if(this.state.student){
            return <Redirect to="/stu-dashboard" />
        }
        else if(this.state.teacher){
            return <Redirect to="/teacher-dashboard"/>
        }
        return(
           

            


            <div className="login">





                    <div class="row align-items-center">
                        <div class="col">
                             
                        </div>
                        <div class="col">

                         <br/>
                         <br/>
                         <h1>Login</h1>
                         <br/><br/>
                         
                        <form onSubmit={this.handleLogin}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"   name='email' onChange={this.handlechange} required/>
                                    
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"name='password' onChange={this.handlepassword} required/>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" name='isStudent' onChange={this.isStudent}/>
                                    <label class="form-check-label" for="exampleCheck1">Are you Student?</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button> &nbsp;&nbsp;
                                <Link to ="/signup">Register here..</Link>
                         </form>
                            <br/>
                            <div className="err" style={{borderStyle:'hidden',color:'red'}}>
                                {ReactHtmlParser(this.state.errMsg)}
                            </div>
                        </div>
                        <div class="col">
                             
                        </div>
                    </div>

        </div> 



        );
    }

}
export default Login;