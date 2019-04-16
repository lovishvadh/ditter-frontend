import React, { Component } from 'react';
import {
    Form,
    Button,
    Card,
    Row,
    Col
  } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../services/userService';
class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    }
    render() {
        return (
        <Form onSubmit={this.handleFormSubmit}>
        <Row>
        <Col>
        <Form.Group controlId="formBasicUsername">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" onChange={(event) => this.handleUserInput(event)} type="text" placeholder="Enter first name" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group> 
        </Col>
        <Col>
         <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" onChange={(event) => this.handleUserInput(event)} type="text" placeholder="Enter last name" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        </Col>
        </Row>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" onChange={(event) => this.handleUserInput(event)} type="text" placeholder="Enter username" />
                <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" onChange={(event) => this.handleUserInput(event)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={(event) => this.handleUserInput(event)} type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <br />
            Already registered? <Link to={"/login"}><Card.Link>Login</Card.Link></Link>
        </Form>);
    }
    componentWillMount() {
        this._isMounted = true;
      }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        if(this._isMounted) {
          this.setState({[name]: value});
        }
      }

    handleFormSubmit = async (e) => {
        e.preventDefault();
      this.props.isActiveLoading(true);
      let validationErrors = [];
        console.log(this.state);
        if(!this.state.username.match(/^[a-zA-Z0-9-_.@$+]{4,16}$/)) {
            validationErrors.push('Username should be minimum 4 and max 16 characters and can contain alphabets, numbers and -_.@$+');
        }
        if(!this.state.email.match(/^[a-zA-Z0-9-_.+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            validationErrors.push('Invalid email.');
        }
        if(!this.state.password.match( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/)) {
            validationErrors.push('Password should be minimum 6 characters, max 15 characters and has to include atleast 1 capital alphabet, 1 lowercase letter, 1 number and 1 special character');
        }
        if(validationErrors.length) {
            validationErrors.forEach((err) => {
                toast.error(err);
            })
        }
        let response = (await userService.signup({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username:this.state.username,
            email: this.state.email,
            password: this.state.password
            }));
        if(response.status) {
            toast.success('Sign up successfull. Please login.');
        } else {
            response.data.errors.forEach((err) => {
                toast.error(err);
            })
        }
      this.props.isActiveLoading(false);
    }


    componentWillUnmount() {
        this._isMounted= false;
      }
}

export default withRouter(SignUp);