import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { readFileSync } from 'fs';

//connect to socket
const socket = openSocket('http://localhost:8000');


class Chat2 extends Component {
    constructor(){
        super();

    this.state={
        status:null,
        chatroom:"chatroom2",
        messages:'',
        textarea:null,
        username:sessionStorage.getItem("user"),
        clearBtn:null
    }

      // Handle Chat Clear
      this.clicked=()=>{
        socket.emit('clear',this.state.chatroom);
    }

     // Handle Input
     this.keydown1=(e)=>{
        if(e.which === 13 && e.shiftKey == false){
            // Emit to server input
            socket.emit('input', {
                name:this.state.username,
                chatroom:this.state.chatroom,
                message: document.getElementById('textarea').value
            });
            document.getElementById('textarea').value = ''
            e.preventDefault();
        }

    }

    
  
      
    }
    componentDidMount(){


      //events
      let data = []
      data.push(this.state.username);
      data.push(this.state.chatroom);
      data.push(Date(Date.now()).toString());

        //send chatroom number
        socket.emit('chatroomnumber',this.state.chatroom)
        socket.emit('userconnected',this.state.username,data)


        socket.on('output', function(data){
            let test = '';
            if(data.length){
                for(var x = 0;x < data.length;x++){
                    let message = data[x].name+": "+data[x].message;
                    
                    test = test + message +'\n'
  
                //     this.state.messages.appendChild(message);
                //    this.state.messages.insertBefore(message, messages.firstChild);
         
                }

            }
            document.getElementById('messages').value = test
        });

        // Clear Message
        socket.on('cleared', function(){
            console.log("Collections for this chatroom have been erased")
            document.getElementById('messages').value = '';
        });

      


       
    }
 
  render() {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-12">
                    <div ref= "test" className="text-right"></div>
                <h1 className="text-center">
                    ChatRoom2 
                    <button id="clear" ref="clear" className="btn btn-danger" onClick={this.clicked.bind(this)}>Clear</button>
                </h1>
                <div ref="status"></div>
                <div ref="chat">
                    <br/>
                    <div className="card">
                        <textarea id="messages" ref="messages" className="card-block" readOnly>

                        </textarea>
                    </div>
                    <br/>
                    <textarea ref="textarea" id="textarea"className="form-control" placeholder="Enter message...then click enter to submit" onKeyDown={this.keydown1.bind(this)}></textarea>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Chat2;
