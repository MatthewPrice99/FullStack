import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Adminnav extends Component {
    render() {
  
      return (
       <header>
           
           <nav>
               <ul>
                   <li className="first">
                      <NavLink to='/eventhistory' exact activeStyle={
                          {color : 'red'}
                      }>Event History</NavLink>
                   </li>
                   <li>
                      <NavLink to='/chathistory' exact activeStyle={
                          {color : 'red'}
                      }>Chat History</NavLink>
                   </li>
                   <li>
                      <NavLink to='/rooms' exact activeStyle={
                          {color : 'red'}
                      }>Rooms</NavLink>
                   </li>
               </ul>
           </nav>
  
  
  
       </header>
      );
    }
  }
  
  export default Adminnav;
  
