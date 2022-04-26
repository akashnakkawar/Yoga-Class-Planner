import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div  >






      
                        <nav class="navbar navbar-light bg-light" >
                        <div class="container-fluid" >
                        <Link class="navbar-brand" to="/stu-dashboard/profile">Profile</Link>
                        </div>
                        </nav>
                        <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                        <Link class="navbar-brand" to="/stu-dashboard/search">Search</Link>
                        </div>
                        </nav>
                        <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                        <Link class="navbar-brand" to="/stu-dashboard/class">Class</Link>
                        </div>
                        </nav>
                        <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                        <Link class="navbar-brand" to="/stu-dashboard/favorite">Favorite</Link>
                        </div>
                        </nav>
                        <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid">
                        <Link class="navbar-brand"to="/stu-dashboard/bookedclasses">Booked Classes</Link>
                        </div>
                        </nav>



                </div>




     );
}
 
export default Navbar;