import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/Signup";
import StudentDashboard from "./components/student/stu-dashboard";
import TeacherDashboard from "./components/teacher/teacher-dashboard";
import Admin from "./components/Admin";
import React from "react";
import Footer from "./components/Footer";
 

class App extends React.Component{
  constructor(){
     super();
     this.state={
       student:'',
       teacher:'',
       isLoggedIn:false,
      
     }
  }
  handleLogout=()=>{
     this.setState({
       student:'',
       teacher:'',
       isLoggedIn:false,

     })
  }
  handleLogin=(data,yes)=>{
    if(yes==='admin'){
      this.setState({isLoggedIn:'admin'})
    }
    else if(yes)
       this.setState({ student:data, isLoggedIn:'student'});

    else
      this.setState({teacher:data, isLoggedIn:'teacher'})
  }
 
    
  render(){
  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.handleLogout}/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login handle={this.handleLogin} />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/stu-dashboard">
            <StudentDashboard student={this.state.student}/>

         </Route>
         <Route path="/teacher-dashboard">
           <TeacherDashboard teacher={this.state.teacher}/>
         </Route>
         <Route>
           <Admin path="/admin"/>
         </Route>
        </Switch>
      </div>
      <Footer/>
      </Router>
  
    </div>
  );
}
}

export default App;
