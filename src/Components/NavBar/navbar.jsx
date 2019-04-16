import React, { Component } from 'react';
import './navbar.css';
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    Col,
    Row
} from 'react-bootstrap';
import LocalStorage from '../../utils/localStorage';
import {withRouter, Link} from 'react-router-dom';

class NavBar extends Component {
    state = {
        searchQuery: ''
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Ditter</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="linkText ml-4 noUnderline" to={"/"}>Home</Link>
                        <Link className="linkText ml-4 noUnderline" to={"/users/all"}>Users</Link>
                    </Nav>
                    <Nav>
                        <Form inline>
                        <Row>
                            <Col xs={8}>
                                <FormControl onChange={(event) => this.handleUserInput(event)} name="searchQuery" type="text" placeholder="Search user by username ..." className="mr-sm-2" value={this.state.searchQuery} />
                            </Col>
                            <Col xs={4}>
                            <Link to={`/profile/${this.state.searchQuery}`}><Button variant="outline-light">Search</Button></Link>
                            </Col>
                        </Row>
                        </Form>
                        <Nav.Link onClick={this.handleLogOut}>Log Out</Nav.Link>   
                    </Nav>
                </Navbar.Collapse>
              
            </Navbar>
        );
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
          this.setState({[name]: value});
      }

    handleLogOut = async () => {
       await LocalStorage.removeAll();
        this.props.history.push('/login')
    }
}

export default withRouter(NavBar);