import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './login.css';

class Login extends Component{
    constructor(props){
        super(props)
      this.state={  
          uName:'',
        Password:'',
        isLogin:'',
        valueLogin:'',
        data:[],
        err:''
    }
    }
    // componentWillMount(){
    //     axios.get("https://api.myjson.com/bins/15wq8u")
    //     .then(response=>{
    //         const data=response.data;
    //         this.setState({
    //             data,
    //             err:'UserName or Password Wrong'
    //         })
    //         console.log(data);
    //     })
    //    }
// handleChange = e => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//         console.log(e.target.name);
//     }
// componentDidMount(){
//     const getData=localStorage.getItem("isLoggedIn");
//     alert(getData);
// }
handleName(e){
this.setState({
    uName:e.target.value
})
}
handlePassword(e){
this.setState({
    Password:e.target.value
})
}
handleSubmit=(e)=>{
    //event.preventDefault();
  const user={
    uName:this.state.uName,
    Password:this.state.Password
  }
  alert("hello")
//   axios.post(`http://127.0.0.1:8000/adminlog/api-auth/userlogin/`, { user })
//       .then(res => {
//           alert("hi")
//         console.log(res);
//         console.log(res.data);
//         // this.props.history.push("/menu/dashboard")
//       })
//   .catch(err=>{console.log("error:"+err)})

    //  this.setState({
    //     valueLogin:"loginSuccess"
    //  })
    //const isLoggedin="";
//     if(this.state.uName =="admin" &&  this.state.Password =="admin"){
//         this.setState({
//             isLogin:true
//         })
//          localStorage.setItem("isLoggedin",JSON.stringify(this.state.valueLogin));
//         alert(isLoggedin);
//    this.props.history.push("/menu/dashboard")
//     }
//     else{
//         alert("enter valid details");
//     }
 
 if(this.state.uName === "admin" &&  this.state.Password === "admin"){
      localStorage.setItem('isLoggedIn', "yes");
      this.props.history.push("/menu/dashboard")
    }
  else{
      alert("Please enter valid credentials!!!");
  }

}
    render(){
                return(
                        <div className="login">
	<h1>Admin Console</h1>
    <form onSubmit={this.handleSubmit}>
    	<input type="text" name="u" id="loginInput" placeholder="Username" required="required" onChange={(e)=>this.handleName(e)}/>
        <input type="password" name="p" id="loginInput1"  placeholder="Password" required="required" onChange={(e)=>this.handlePassword(e)} />
        <button type="submit" className="login-btn login-btn-primary login-btn-block login-btn-large">Login</button>
    </form>
</div>

        )
    }
}
export default Login;