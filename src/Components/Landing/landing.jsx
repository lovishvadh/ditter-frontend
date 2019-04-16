import React, { Component } from 'react';
import Navbar from  '../NavBar/navbar';
import UserInfoCard from '../UserInfoCard/userInfoCard';
import Feed from '../Feed/feed';
import {
    Row,
    Col
} from 'react-bootstrap';
import './landing.css';
import userService from '../../services/userService';
import ditterService from '../../services/ditterService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LocalStorage, { Keys } from "../../utils/localStorage";
class Landing extends Component {
    state = { userData: {},userFeed: [], showAllUsers: false, allUsers: [] }
    render() { 
        return (
            <div className="landing">
                <div className="navBar">
                    <Navbar />
                </div>
                { this.whatToRender() }
            </div>
         );
    }

    async componentWillMount() {
        this._feedInterval = '';
        if(this.props.location.pathname !== '/users/all') {
            this.setState({showAllUsers: false});
            const username = (this.props.match.params.username || '');
            this.setState({userData: (await userService.getUserData(username)).data,
                userFeed: (await ditterService.getFeed(username)).data
            });
            this._feedInterval = setInterval(async () => {
                this.setState({userData: (await userService.getUserData(username)).data,
                    userFeed: (await ditterService.getFeed(username)).data
                });
            }, 2000);
             
            if(!this.state.userData.username) {
                toast.error('Profile not found');
                this.props.history.push('/');
            }
        } else {
            this.setState({showAllUsers: true});
            this.setState({allUsers: (await userService.allUsers()).data});
        }
    }

    whatToRender = () => {
        if(this.state.showAllUsers) {
            return (
                <div>
                <Row>
                    {this.state.allUsers.map((user) => {
                        return (
                            <Col key={user.username}>
                                <Link className="noUnderline" to={`/profile/${user.username}`}><UserInfoCard data={user} feedLength="x" /></Link>
                            </Col>
                            );
                    })}
                </Row>
                </div>
            );
        } else {
            return (<div>
                <Row>
                    <Col lg={4} xs={12} md={12}>
                         <UserInfoCard data={this.state.userData} feedLength={this.state.userFeed.length} incrementFollowers={this.incrementFollowers} unFollowUser={this.decrementFollower}/>
                    </Col>
                    <Col lg={8} xs={12} md={12}>
                         <Feed feed={this.state.userFeed}/>
                    </Col>
                </Row>
                </div>);
        }
    }

    incrementFollowers = () => {
        let data = this.state.userData;
        data.followers.push(`${LocalStorage.get(Keys.username)}`);
        this.setState({userData: data});
    }

    decrementFollower = ()  => {
        let data = this.state.userData;
        data.followers = data.followers.filter((ele) => {
            return ele !== LocalStorage.get(Keys.username);
        });
        this.setState({userData: data});
    }

    componentWillUnmount() {
        if(this._feedInterval)
            clearInterval(this._feedInterval);
    }
}
 
export default Landing; 