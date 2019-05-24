import React,{Component} from 'react';
import './dashboard.css';
import Menu from '../menu/menu';
import {Redirect,NavLink} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      topicData:[],
      isLoaded:false
    }
  }
  componentWillMount() {
    if (localStorage.getItem('isLoggedIn') != null) {
    axios.get("http://127.0.0.1:8000/questions/topic/")
      .then(response => {
        console.log(response.data);
        const topicData = response.data;
        this.setState({
          topicData:topicData,
          isLoaded: true
        })
      })
  }
}    

    //  componentWillMount(){
    //   const receivedData=localStorage.getItem(JSON.stringify(isLoggedin)); 
    //      if(!receivedData){
    //         this.props.history.push("/")
    //      } 
    //  }
    render(){
      const {topicData}=this.state;
        if (localStorage.getItem('isLoggedIn') === null) {
            return <Redirect to='/login' />
          }
        else{
         return(

            <div >
        <Menu />
        <main className="grid">
        {          
          topicData.map(topic =>{
          const tname= topic.name
          return   (            
              <NavLink to='/menu/questions' className="tiles" >
                <div className="tiles">
                <div class="image">
    <img src={require('.././img1.jpg')} alt="Sample photo" />
      <h2>{topic.name}</h2>
    </div>           
    {/* <div className="text">
        <button>{topic.name}</button>
   </div> */}
          </div>    
              </NavLink>          
             )
         })
         
        } 
        </main>
      {/* <div className="dashoardImg">     
         <h2>Welcome to Capability Test App</h2> 
        </div>  */}
    {/* <main className="grid">
        <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>    
 </NavLink>
 <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>    
 </NavLink>
 <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>    
 </NavLink>
 <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>    
 </NavLink>
 <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>
     </NavLink>
     <NavLink to='/menu/questions' className="tiles" >
  <div className="tiles">
    <img src={require('.././sql2.png')} alt="Sample photo" />
    <div className="text">
    <button>SQL</button>
    </div>
    </div>    
 </NavLink>
 
 </main> */}
</div>   
    )
    }
             }
 
}
export default Dashboard;