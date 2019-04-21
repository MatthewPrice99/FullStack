import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


class Home extends Component {
    constructor(){
        super();
        this.state = {
            username:null
        }

        this.setname = ()=>{
            if(this.refs.name.value === ''){
                alert('Please set a name.')
            }else{
                
            this.setState({username: this.refs.name.value})
            sessionStorage.setItem("user",this.refs.name.value)
            console.log(this.refs.name.value)
            }
       
        };

    };

    componentDidMount(){


    }

  render() {
    return (
     <div className='container-fluid'>
        <h1>ChatRooms</h1>
        <input type="text" placeholder= "Enter name..." ref="name"></input>
        <button className ="setName" onClick={this.setname.bind(this)}>Set Name</button>

     </div>
    );
  }
}

export default Home;
