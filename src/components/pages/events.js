import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { once } from 'events';

//connect to socket
const socket = openSocket('http://localhost:8000');

class Events extends Component {
    constructor(props){
        super(props);

        this.state = {
            events:[],
            response:null,
            x:''
   
        }
   
    }
    componentDidMount(){
        socket.emit('eventcall');
        socket.on('eventoutput',data => this.setState(()=>({ 
            response : JSON.stringify(data)
          }),()=>{
              this.setState({x:'12312'})
            
          }));

        

    }
 
  render() {
    return (
     
     <div className='container-fluid'> 
        <h1 className="title">Events page</h1>
        <div id='stuff2'>
            {this.state.response}
        </div>
        

    
     </div>
    );
  }
}

export default Events;
