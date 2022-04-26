import React from "react";
import Navbar from "./navbar";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from "./profile";
import Search from "./search";
import Class from "./class";
import Welcome from "./welcome";
import Bookedclasses from "./bookedclasses";
import Directory from "./directory";
import ShowDirectory from "./showdirectory";
import AsanasDetails from "./asanasdetails";
import CreateClass from "./createclass";


class TeacherDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
         teacher:'',
        }
       
    }
   
        

    render(){
        
        return(

            <div className="teacher-dashboard">
            <Router>
            <div class="row">
               <div class="col-2" ><Navbar/></div>
               <div class="col-8">
               
               <Switch>
             <Route exact path="/teacher-dashboard/profile">
                    <Profile details={this.props}/>
             </Route>
            <Route path="/teacher-dashboard/search">
                    <Search details={this.props}/>
            </Route>
            <Route path="/teacher-dashboard/class">
                <Class details={this.props}/>
            </Route>
            <Route path="/teacher-dashboard/bookedclasses">
                <Bookedclasses data={this.props} />
            </Route>
            <Route path="/teacher-dashboard/createdirectory">
                <Directory data={this.props} />
            </Route>
            <Route path="/teacher-dashboard/showdirectory">
                <ShowDirectory data={this.props} />
            </Route>
            <Route path="/teacher-dashboard/createclass">
                <CreateClass data={this.props} />
            </Route>
            <Route path="/teacher-dashboard/asanasdetails/:aid">
                     <AsanasDetails  />
                 </Route>
            <Route>
                <Welcome details={this.props} />
            </Route>
           
          </Switch>
             
               </div>
            </div>
            </Router>    
           </div> 









              
        );
    }
    
}

export default TeacherDashboard;