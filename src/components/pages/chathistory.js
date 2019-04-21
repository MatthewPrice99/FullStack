import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';

//connect to socket
const socket = openSocket('http://localhost:8000');



class Chathistory extends Component {
    constructor(){
        super();
        
        this.state = {
            events:[],
            response:null
           
            
           
        }

    }
    componentDidMount(){
        socket.emit('chatcall');

        socket.on('useroutput',data => this.setState(()=>({ 
            response : JSON.stringify(data)
          }),()=>{
         
            
          }));

    }
 
  render() {
    return (
     
     <div className='container-fluid'> 
        <h1 className="title">Chathistory page</h1>
        {this.state.response}
    
     </div>
    );
  }
}

export default Chathistory;
