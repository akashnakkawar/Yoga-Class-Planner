import React from "react";
import "./stu-dashboard.css";
import Navbar from "./navbar";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./profile";
import "./search";
import Profile from "./profile";
import Search from "./search";
import Class from "./class";
import Welcome from "./welcome";
import Bookedclasses from "./bookedclasses";
import AsanasDetails from "./asanasdetails";
import Favourite from "./favourite";

class StudentDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
         student:'',
        }
       
    }
   
        

    render(){
        
        return(
              <div className="stu-dashboard">
                  <Router>
                  <div class="row">
                     <div class="col-2" ><Navbar/></div>
                     <div class="col-8">
                     
                     <Switch>
                   <Route exact path="/stu-dashboard/profile">
                          <Profile data={this.props}/>
                   </Route>
                  <Route path="/stu-dashboard/search">
                          <Search student={this.props}/>
                  </Route>
                  <Route path="/stu-dashboard/class">
                      <Class data={this.props}/>
                  </Route>
                  <Route path="/stu-dashboard/bookedclasses">
                     <Bookedclasses data={this.props} />
                 </Route>
                 <Route path="/stu-dashboard/favorite">
                     <Favourite data={this.props} />
                 </Route>
                 <Route path="/stu-dashboard/asanasdetails/:aid/:id">
                     <AsanasDetails  />
                 </Route>
                  <Route>
                      <Welcome data={this.props} />
                  </Route>
                 
                </Switch>
                   
                     </div>
                  </div>
                  </Router>    
                 </div> 





                  
              
        );
    }
    
}

export default StudentDashboard;