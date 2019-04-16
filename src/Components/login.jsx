import React, { Component } from 'react';
import {
    Form,
    Button,
    Card
  } from 'react-bootstrap';
import { toast } from 'react-toastify';
import userService from '../services/userService';
import LocalStorage, { Keys } from '../utils/localStorage';
import {Link} from 'react-router-dom'
import {
  withRouter
} from 'react-router-dom'

class Login extends Component {
    state = { 
        username: '',
        password: '',
        isLoggedIn: false
     }
    render() { 
        return (
          <Form onSubmit={this.handleLoginForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={(event) => this.handleUserInput(event)} type="text" placeholder="Enter username" value={this.state.username} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(event) => this.handleUserInput(event)} name="password" type="password" placeholder="Password" value={this.state.password}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br />
            Not registered yet?<Link to={"/signup"}><Card.Link> Register</Card.Link></Link>
          </Form> 
          );
    }
    componentWillMount() {
      this._isMounted = true;
    }

    handleLoginForm = async (e) => {
      try {
      e.preventDefault();
      this.props.isActiveLoading(true);
      let validationErrors = [];
      if(this.state.username === '') {
        validationErrors.push('Please enter username.')
      }
      if(this.state.password === '') {
        validationErrors.push('Please enter password.');
      }
      if(validationErrors.length) {
        validationErrors.forEach((err) => {
          toast.error(err);
        });
      } else {
        let {status,data} = await userService.login({
          username: this.state.username,
          password: this.state.password
        });
        if(status) {
          LocalStorage.set(Keys.username, this.state.username);
          LocalStorage.set(Keys.jwtToken, data.token);
          toast.success('Login Successfull');
          this.props.renderLanding();
        } else {
          data.errors.forEach((err) => {
            toast.error(err);
          });
        }
      }
      if(this._isMounted) {
        this.props.isActiveLoading(false);
      }
    } catch(err) {
        throw err;
      }
    }

    handleUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      if(this._isMounted) {
        this.setState({[name]: value});
      }
    }

    componentWillUnmount() {
      this._isMounted= false;
    }
}
 
export default withRouter(Login);