import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Prompt } from 'react-router-dom';
import openSocket from 'socket.io-client';



//connect to socket
const socket = openSocket('http://localhost:8000');






class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      redirect:false
    }

    this.checkpass = ()=>{
      
        let user = this.refs.user.value;
        let pass = this.refs.pass.value;
        let redirect1;


        socket.emit('checkpass',user);

        socket.on('output2',function(data){
          if(data[0].password=== pass && data[0].username === user){  
              sessionStorage.setItem('admin',"true");
              // window.location.reload()
              window.location = './admin'
                    
            
          }else{
              alert('incorrect user or pass')
          }

      })
      

    }




  }
  componentDidMount(){
   if(sessionStorage.getItem("admin")===true){
     this.setState({redirect:true});
   }

  }
 
  render() {

    const { redirect } = this.state;
    if (redirect===true) {
      return <Redirect to=''/>;
    }

    return (
     <div className='container-fluid'>
        <h1 className="title">Admin Login</h1>

        <div id="loginFields">
          <input  type="text" className="fields" placeholder="username" ref="user"></input>
          <br/>
          <input  type="password" className="fields" placeholder="password" ref="pass"></input>
          <br/>
          <button id="loginBtn" onClick={this.checkpass.bind(this)}> Login</button>
        </div>
      
     </div>
    );
  }
}

export default Login;
