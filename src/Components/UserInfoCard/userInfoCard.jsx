import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Image,
    Button
} from 'react-bootstrap';
import bgImage from '../../assets/images/lw.png';
import profileImage from '../../assets/images/profile.jpg';
import './userInfoCard.css';
import { toast } from 'react-toastify';
import DitterModal from '../DitterModal/ditterModal';
import userService from '../../services/userService';
import LocalStorage, {Keys} from '../../utils/localStorage.js';

class UserInfoCard extends Component {
    state = {
        show: false,
    }
    render() {
       const data = (this.props.data) || {}; 
        return (
            <div className="userInfoCard mb-4">
                <DitterModal show={this.state.show} handleClose={this.handleClose} handleOpen={this.handleOpen}/>
                <Card>
                    <Card.Img variant="top" src={bgImage} className="landingPicture"/>
                    <Image src={profileImage} roundedCircle className="profilePicture"/>
                    <Card.Body className="userNameInfo">
                        <span className="capitalize">{data.firstName} {data.lastName}</span>
                        <br/>
                        <span className="darkText">
                           @{data.username}
                        </span>
                        </Card.Body>
                        <Card.Body className="darkText">
                        <Row>
                        {this.renderDitter()}
                        <Col>Followers</Col>
                        <Col>Following</Col>
                        </Row>
                        <Row>
                        {this.renderDitterValue()}
                        <Col>{(data.followers || []).length}</Col>
                        <Col>{(data.following || []).length}</Col>
                        </Row>
                        </Card.Body>
                        { this.showFollowBtn() }
                        </Card>
            </div>
        );
    }

    showFollowBtn = () => {
        if(this.props.feedLength !== 'x') {
            let username = LocalStorage.get(Keys.username);
            if(!( username=== this.props.data.username) || !this.props.data.username) {
                if(!(this.props.data.followers || []).includes(username)) {
                    return <Button onClick={this.followUser} className="btn btn-primary btn-sm">Follow</Button>
                } else {
                    return <Button onClick={this.unFollowUser} className="btn btn-secondary btn-sm">Unfollow</Button>
                }
            } else {
                return <Button onClick={this.handleOpen} className="btn btn-primary btn-sm">Ditter</Button>
            }
        }
    }

    renderDitter = () => {
        if(this.props.feedLength !== 'x') {
            return <Col>Ditters</Col>;
        }
    }

    renderDitterValue = () => {
        if(this.props.feedLength !== 'x') {
            return <Col>{this.props.feedLength}</Col>;
        }
    }

    followUser = async () => {
        let response = await userService.follow({userToFollow: this.props.data.username});
        if(response.status) {
            toast.success(`You started following ${this.props.data.username}`);
            this.props.incrementFollowers();
            // this.props.follow();
        } else {
            response.data.errors.forEach(element => {
                toast.error(element); 
            });
    }
}

    unFollowUser = async () => {
        let response = await userService.unfollow({userToUnfollow: this.props.data.username});
        if(response.status) {
            toast.success(`You unfollowed ${this.props.data.username}`);
            this.props.unFollowUser();
        } else {
            response.data.errors.forEach(element => {
                toast.error(element);
            });
        }
    }

    handleOpen = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }
}

export default UserInfoCard;