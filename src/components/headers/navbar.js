import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navbar extends Component {
    render() {
  
      return (
       <header>
           
           <nav>
               <ul>
                   <li className="first">
                      <NavLink to='/' exact activeStyle={
                          {color : 'red'}
                      }>Home</NavLink>
                   </li>
                   <li>
                      <NavLink to='/chat1' exact activeStyle={
                          {color : 'red'}
                      }>Chatroom 1</NavLink>
                   </li>
                   <li>
                      <NavLink to='/chat2' exact activeStyle={
                          {color : 'red'}
                      }>Chatroom 2</NavLink>
                   </li>
                   <li>
                      <NavLink to='/chat3' exact activeStyle={
                          {color : 'red'}
                      }>Chatroom 3</NavLink>
                   </li>
                   <li>
                      <NavLink to='/admin' exact activeStyle={
                          {color : 'red'}
                      }>Login</NavLink>
                   </li>
               </ul>
           </nav>
  
  
  
       </header>
      );
    }
  }
  
  export default Navbar;
  
