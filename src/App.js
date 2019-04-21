import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//import components
import Login from './components/pages/login';
import Home from './components/pages/home';
import Chat1 from './components/pages/chat1';
import Chat2 from './components/pages/chat2';
import Chat3 from './components/pages/chat3';
import Admin from './components/pages/admin';
import Navbar from './components/headers/navbar';
import Adminnav from './components/headers/adminnav';
import Chathistory from './components/pages/chathistory';
import Events from './components/pages/events';
import Rooms from './components/pages/rooms';






//includes
import './assets/css/stuff.css'


class App extends Component {
  constructor(props){
    super(props);
   this.state = {
     navbar:<Navbar/>   
   }
   
  }
  componentDidMount(){
    if(sessionStorage.getItem("admin")==="true"){
      this.setState({navbar:<Adminnav/>})
    }else{
      this.setState({navbar:<Navbar/>})

    }


  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        {this.state.navbar}
      
        <Route path ="/admin" exact strict render={
            ()=>{
              if(sessionStorage.getItem("admin")==="true"){
                return <Admin/>
              }
              return <Login/>    
            }
          }/>
          <Route path ="/eventhistory" exact strict render={
            ()=>{
              if(sessionStorage.getItem("admin")==="true"){
                return <Events/>
              }
              return <Login/>    
            }
          }/>
          <Route path ="/chathistory" exact strict render={
            ()=>{
              if(sessionStorage.getItem("admin")==="true"){
                return <Chathistory/>
              }
              return <Login/>    
            }
          }/>
            <Route path ="/rooms" exact strict render={
            ()=>{
              if(sessionStorage.getItem("admin")==="true"){
                return <Rooms/>
              }
              return <Login/>    
            }
          }/>

          <Route path ="/" exact strict render={
            ()=>{
              return <Home/>    
            }
          }/>
             

          <Route path ="/chat1" exact strict render={
            ()=>{
              if(sessionStorage.getItem("user")){
                return <Chat1/>  
              }
              {alert('Please set a username first')}
              return <Home/>    
            }
          }/> 

          <Route path ="/chat2" exact strict render={
            ()=>{
              if(sessionStorage.getItem("user")){
                return <Chat2/>  
              }
              {alert('Please set a username first')}
              return <Home/>      
            }
          }/>  

          <Route path ="/chat3" exact strict render={
            ()=>{
              if(sessionStorage.getItem("user")){
                return <Chat3/>  
              }
              {alert('Please set a username first')}
              return <Home/>      
            }
          }/>     

    





        </div>
      </BrowserRouter>
    );
  }
}

export default App;
