import React from "react";
import apis from "../api/api";
import { Redirect } from "react-router";
import ReactHtmlParser from 'react-html-parser';

class Signup extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            name:'',
            email:'',
            password:'',
            gender:'male',
            age:'',
            yes:'yes',
            isSignUp:false,
            confirmMsg:'',
        }
    }



    
    handleName = (e) =>{
        console.log(e.target.value)
        this.setState({name:e.target.value});
    }
    handlePassword =(e)=>{
        console.log('iam')
        var md5 = require('md5');
        var p = md5(e.target.value)
        this.setState({password:p});
        console.log(p)
    }
    handleEmail =(e)=>{
        this.setState({email:e.target.value});
    }
    handleStudent =(e)=>{
        
        
        this.setState({yes:e.target.value})
        
    }
    handleAge =(e)=>{
        console.log(e.target.value)
        this.setState({age:e.target.value});
    }
    handleGender = (e) =>{
       
        
        this.setState({gender:e.target.value})
    }
    handleSignup = async (e)=>{
        
        e.preventDefault();
        console.log(this.state)
        const {name,email,password,gender,age} =this.state
        const preferences ={
            positions:[],
            problems:[],
        }
       
    
        const payload = {name, email, password, gender, age,preferences}
        console.log(payload)
        if(this.state.yes==='yes'){
            
            await apis.insertStudent(payload).then((res)=>{
                if(res.status===200){
                    this.setState({confirmMsg:'<div class="alert alert-success" role="alert"> Email id alredy present please try again </div>'})
                 setTimeout(()=>{
                    this.setState({isSignUp:false,confirmMsg:' '})
                },4000)
                }
                else{
                 this.setState({confirmMsg:'<div class="alert alert-success" role="alert"> Successfully register <br/> Please Login to continue.. </div>'})
                 setTimeout(()=>{
                    this.setState({isSignUp:true})
                },4000)
            }
                  })
                
           .catch(e=>{
              console.log('error is ',e)
              })

       }
       else{
           
           await apis.insertTeacher(payload).then(()=>{
           
            this.setState({confirmMsg:'<div class="alert alert-success" role="alert"> Successfully register <br/> Please Login to continue.. </div>'})
                 setTimeout(()=>{
                    this.setState({isSignUp:true})
                },3000)
                 
             })
      .catch(()=>{
        
        this.setState({confirmMsg:'<div class="alert alert-danger" role="alert"> Error occured..!</div>'})
        setTimeout(()=>{
           this.setState({confirmMsg:''})
       },3000)


         })
         

       }
    }




    

    render(){
        if(this.state.isSignUp){
            return <Redirect to="/login" />
        }
        return(
            <div class="container">
                        <br/><br/><br/><br/>
                        <div class="row">
                            <div class="col"></div>
                            
                            <div class="col-6">
                            <h1>Sign In..</h1><br/>
                             {ReactHtmlParser(this.state.confirmMsg)}
                            <form onSubmit={this.handleSignup}>
                        <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputEmail3" placeholder="Full Name" onChange={this.handleName} required/>
                            </div>
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" onChange={this.handleEmail} required/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" onChange={this.handlePassword} required/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Age</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" id="age" placeholder="Age" onChange={this.handleAge} required/>
                            </div>
                        </div>
                        <fieldset class="form-group">
                            <div class="row" onChange={this.handleGender}>
                            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="male" checked/>
                                <label class="form-check-label" for="gridRadios1">
                                    Male
                                </label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="female"/>
                                <label class="form-check-label" for="gridRadios2">
                                    Female
                                </label>
                                </div>
                                <div class="form-check disabled">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="others" />
                                <label class="form-check-label" for="gridRadios3">
                                    Others
                                </label>
                                </div>
                            </div>
                            </div>
                        </fieldset>
                        <fieldset class="form-group">
                            <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Student</legend>
                            <div class="col-sm-10" onChange={this.handleStudent} required>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="student" id="student" value="yes" checked/>
                                <label class="form-check-label" for="gridRadios1">
                                    Yes
                                </label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="student" id="student" value="no"/>
                                <label class="form-check-label" for="gridRadios2">
                                    No
                                </label>
                                </div>
                                
                            </div>
                            </div>
                        </fieldset>



                    <div class="form-group row">
                        <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                    </form>

                                                </div>
                                                <div class="col"></div>
                                            </div>
                                            
                                </div>





        //     <div class="row align-items-center">
        //                 <div class="col">
                             
        //                 </div>
        //                 <div class="col">
        // <div className="border" >
        //     {this.state.confirmMsg}
            
        //     <form onSubmit={this.handleSignup}>
        //     <div class="form-group">
        //         <label>Enter name:</label> <br/>
        //         <input 
        //             type='text'
                    
        //             name='name'
        //             onChange={this.handleName}
        //             required
        //             />
        //     </div>
        //     <div class="form-group">
        //         <label>Enter email id </label> <br/>
        //         <input
        //             type="email"
        //             name='email'
        //             onChange={this.handleEmail}
        //             required
        //             /> </div> 
        //     <div class="form-group">
        //         <label>Enter password </label> <br/>
        //         <input
        //             type="password"
        //             onChange={this.handlePassword}
        //             required
        //             />
        //             </div>
        //             <div class="form-group">
        //         <label>Re-enter password </label> <br/>
        //         <input
        //             type="password"
        //             required
        //             // onChange={this.handlePassword}
        //             />
        //             </div>
        //             <div class="form-group">
        //         <label>select gender</label> &nbsp;&nbsp; 
        //         <select name='gender'id='gender' onChange={this.handleGender} required> 
        //             <option value="DEFAULT" disabled hidden>Choose an option.. </option>
        //             <option value='others'>others</option>
        //             <option value='male'>Male</option>
        //             <option value='female's>Female</option>
                    
        //         </select>
        //         </div>
        //         <div class="form-group">
        //         <label>Enter age </label> <br/>
        //         <input
        //             type="number"
        //             onChange={this.handleAge}
        //             required
        //             />
        //             </div>
        //             <div class="form-group">
        //         <label>Are you student? </label> &nbsp;&nbsp;
        //         <select name='student'id='student' onChange={this.handleStudent} required> 
        //         <option value="DEFAULT" disabled hidden>Choose an option.. </option>
        //             <option value='yes'>Yes</option>
        //             <option value='no'>No</option>
        //             </select>
        //        </div>
        //        <div class="form-group">
        //             <button type="submit" class="btn btn-primary">Submit</button> 
        //             </div>
        //     </form>
        //     </div>
        //     <div class="col"></div>
                             
                        
        //     </div>
        // </div>
        )
    }
}
 
export default Signup;