import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';

//connect to socket
const socket = openSocket('http://localhost:8000');


class Rooms extends Component {
 
  render() {
    return (
     
     <div className='container-fluid'> 
        <h1 className="title">Rooms page</h1>
    
     </div>
    );
  }
}

export default Rooms;
