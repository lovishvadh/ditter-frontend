import React, { Component } from 'react';
import './noMatch.css';
import Broken from '../../assets/images/bg.jpg'

class NoMatch extends Component {
    state = {  }
    render() { 
        return (
            <div className="page-container">
            <div className="bg" style={{ backgroundImage: 'url(' + Broken + ')'}}></div>
          </div>
         );
    }

   
 
   
}
 
export default NoMatch; 
