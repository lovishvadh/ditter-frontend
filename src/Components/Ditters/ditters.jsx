import React, { Component } from 'react';
import './ditters.css';
import {
    Image
} from 'react-bootstrap';
import profileImage from '../../assets/images/profile.jpg';
import {Link} from 'react-router-dom';

class Ditter extends Component {
    state = {  }
    render() { 
        return (
            <div className="ditter">
                <Image src={profileImage} roundedCircle className="ditterProfilePicture"/>
                <span className="m-60">
                <Link to={`/profile/${this.props.feedData.username}`}><span className="m-2 alignTop darkText">@{this.props.feedData.username}</span></Link>
                <span className="m-2 darkText alignTop">{this.props.feedData.timestamp}</span>
                <p className="ditterBody m-60">
                    {this.props.feedData.ditterText}
                </p>
                </span>
            </div>
        );
    }
}
 
export default Ditter;