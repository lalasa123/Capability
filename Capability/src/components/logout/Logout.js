 import React, { Component } from 'react';
  import { NavLink ,Route,Redirect} from 'react-router-dom';
 import './Logout.css';
 import Login from '../login/login';

class Logout extends Component {
     constructor(props){
     super(props)
     this.state={
     logout:""   
          }
      }
     componentWillMount(){
        localStorage.removeItem('isLoggedIn');
  
     }
     render() {
        
         if (localStorage.getItem('isLoggedIn') === null) {
             return <Route to='/login' component={Login} />
             //return <Redirect to='/login'  />
           }
         return (
           
 <div className="logout-align">
                  {/* <p><b>Logged out successfully</b></p>
                 {/* //<NavLink to='/login' className="navlink" onClick={(e)=>{this.handleLogout(e)}}>click here to re-login </NavLink> 
                 return <Redirect to='/login' />*/} 

             
              </div>
         );
    }
 }

 export default Logout;