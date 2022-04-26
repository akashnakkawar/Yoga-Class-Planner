import {Link} from 'react-router-dom';
import React from 'react';

class Navbar extends React.Component{
   
    render(){
    if(this.props.isLoggedIn==='teacher'){
       
        return(

            <ul class="nav justify-content-center" style={{fontSize:'25px',backgroundColor:'#e6c670'}}>
            <li class="nav-item">
                
                <Link class="nav-link" style={{color:'#c22d08',fontSize:'28px'}} to="/"><p>YogaClassPlanner</p></Link>
             </li>
            <li class="nav-item">
                
                <Link class="nav-link" style={{color:'black'}} to="/">Home</Link>
             </li>
             <li class="nav-item">
                
                <Link class="nav-link" style={{color:'black'}} to="/teacher-dashboard">My Actions</Link>
             </li>
             <li class="nav-item">
                 <Link class="nav-link" style={{color:'black'}} to="/" onClick={()=>this.props.logout()}>Logout</Link> 
                
            </li>
        </ul>

        );
    }
    else if(this.props.isLoggedIn==='student'){

        return(

            <ul class="nav justify-content-center" style={{fontSize:'25px',backgroundColor:'#e6c670'}}>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'#c22d08',fontSize:'28px'}} to="/"><p>YogaClassPlanner</p></Link>
                 </li>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'black'}} to="/">Home</Link>
                 </li>
                 <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'black'}} to="/stu-dashboard">My Actions</Link>
                 </li>
                 <li class="nav-item">
                     <Link class="nav-link" style={{color:'black'}} to="/" onClick={()=>this.props.logout()}>Logout</Link> 
                    
                </li>
            </ul>
            

         
        );
        
    } else if(this.props.isLoggedIn==='admin'){

        return(

            <ul class="nav justify-content-center" style={{fontSize:'25px',backgroundColor:'#e6c670'}}>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'#c22d08',fontSize:'28px'}} to="/"><p>YogaClassPlanner</p></Link>
                 </li>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'black'}} to="/">Home</Link>
                 </li>
                
                 <li class="nav-item">
                     <Link class="nav-link" style={{color:'black'}} to="/" onClick={()=>this.props.logout()}>Logout</Link> 
                    
                </li>
            </ul>
            

         
        );
        
    }
    return ( 

        <ul class="nav justify-content-center" style={{fontSize:'25px',backgroundColor:'#e6c670'}}>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'#c22d08',fontSize:'28px'}} to="/"><p>YogaClassPlanner</p></Link>
                 </li>
                <li class="nav-item">
                    
                    <Link class="nav-link" style={{color:'black'}} to="/">Home</Link>
                 </li>
                 <li class="nav-item">
                     <Link class="nav-link" style={{color:'black'}} to="/login">Login</Link> 
                    
                </li>
                </ul>





       
     );
}
 
}
export default Navbar;