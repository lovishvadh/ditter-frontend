import React, {
  Component
} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home/home';
import Landing from './Components/Landing/landing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalStorage, {Keys} from './utils/localStorage';
import {  Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return ( 
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Router>
          <PrivateRoute authed={this.isLoggedIn()} key="landing-default" path="/" component={Landing} exact/>
          <PrivateRoute authed={this.isLoggedIn()} key="username-default" path="/profile/:username" component={Landing} />
          <PrivateRoute authed={this.isLoggedIn()} key="users" path="/users/all" component={Landing} />
          <Route
            path='/login' key="login"
            render={() => <Home  componentToLoad='Login' />}
          />
           <Route
            path='/signup' key="signup"
            render={() => <Home  componentToLoad='Sign Up' />}
          />
        </Router>
      </div>
    );
  } 

  isLoggedIn() {
    return !!(LocalStorage.get(Keys.jwtToken) && LocalStorage.get(Keys.username));
  }
}
function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default App;