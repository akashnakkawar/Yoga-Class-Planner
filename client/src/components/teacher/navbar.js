import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 

        






        <div style={{maxHeight:'100vh'}} >
        <nav class="navbar navbar-light bg-light" >
        <div class="container-fluid" >
        <Link class="navbar-brand" to="/teacher-dashboard/profile">profile</Link><br/>
        </div>
        </nav>
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/search">Search</Link>
        </div>
        </nav>
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/class">Class</Link>
        </div>
        </nav>
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/createclass">Create Class</Link>
        </div>
        </nav>
        
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/bookedclasses">Booked Classes</Link>
        </div>
        </nav>
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/createdirectory">Create Sequence</Link>
        </div>
        </nav>
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/teacher-dashboard/showdirectory">Show sequence</Link>
        </div>
        </nav>
        



</div>

       
     );
}
 
export default Navbar;