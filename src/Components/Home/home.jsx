import React, { Component } from "react";
import './home.css';
import Login from '../login';
import SignUp from '../signup';
import LoadingOverlay from 'react-loading-overlay';
import {
  withRouter
} from 'react-router-dom';

class Home extends Component {
  state = {
    title: this.props.componentToLoad,
    isActive: false
  };
  render() {
    return (
      <LoadingOverlay
      active={this.state.isActive}
      spinner
      text='Loading...'>
      <div className="home">
        <div className="formContainer">
        <span className="card-title">
						{this.state.title}
					</span>
          {this.formToRender()}
        </div>
        </div>
        </LoadingOverlay>
      );
  }

  loadingIsActive = (status) => {
    this.setState({isActive: status});
  }

  formToRender() {
    if(this.state.title === 'Login') {
      return <Login isActiveLoading={this.loadingIsActive} renderLanding={this.renderLanding}/>
    } else {
      return <SignUp isActiveLoading={this.loadingIsActive} />
    }
  }

  renderLanding = () => {
    this.props.history.push('/');
  }
}

export default withRouter(Home);
