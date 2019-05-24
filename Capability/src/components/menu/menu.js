import React, { Component } from 'react';
import './menu.css';
import { NavLink, withRouter } from 'react-router-dom';
import Logout from '../logout/Logout';

class Menu extends Component {
    componentWillMount() {
        document.body.style = 'background: #e9ecef;';
    }
    handleLogout(){
        alert("bye");
        // localStorage.removeItem('isLoggedIn');
        //document.body.addClass('bodyStyle');
        // document.body.classList.add('bodyStyle');
        // return <Redirect to='/login' />
        this.props.history.push('/login')
    }
    render() {
        return (
            <div id="nav">
                    <header id="header">
                    <div className="container">
                       <nav id="nav-menu-container">
                            <ul className="nav-menu">
                            <li><img src={require('.././arohaLogo.png')} alt=""/></li>
                                <li ><NavLink to='/menu/dashboard' className="menu-active">Dasboard</NavLink></li>
                                <li><NavLink to='/menu/questions' className='dropdown-toggle'>Questions</NavLink>
                                    <ul className="dropdown-menu">
                                        <li ><NavLink to='/menu/questionTopic' className="navlink" >Question Topic</NavLink></li>
                                        <li ><NavLink to='/menu/questionType' className="navlink" >Question Type</NavLink></li>
                                       
                                        <li ><NavLink to='/menu/questionComplexity' className="navlink" >Question Complexity</NavLink></li>
                                        <li ><NavLink to='/menu/questions' className="navlink" > Questions</NavLink></li>

                                    </ul>

                                </li>

                                {/*  <li><NavLink to='/menu/answers' className='dropdown-toggle'>Answers</NavLink>
                                    <ul className="dropdown-menu">
                                         <li><NavLink to='/menu/answers' className="navlink">Answers</NavLink></li>
                                     </ul>
                                </li> */}
                                <li><NavLink to='/menu/results' className='dropdown-toggle'>Results</NavLink>

                                    <ul className="dropdown-menu">
                                        <li><NavLink to='/menu/results' className="navlink">Results</NavLink></li>
                                    </ul></li>
                                     
                                         {/* <li><button type="button" onClick={()=>{this.handleLogout()}}>Logout</button></li>  */}
                            </ul>

                        </nav>
                    </div>
                    
                </header>
                  <div className="menu-logout">
                  <ul className="nav-menu"><li><NavLink to='#' className="navlink" onClick={()=>{this.handleLogout()}}>Logout</NavLink></li> </ul>
                </div>
            </div>

        )
    }
}
export default withRouter(Menu);