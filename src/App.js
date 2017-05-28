import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';
import List from './Components/List';
import Register from './Components/Register';
import Enrollments from './Components/Enrollments';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed',
      user: null
    }

    this.handleNavClick = this.handleNavClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    this.setState({user:response.profileObj});
  }

  handleNavClick(e) {
    this.setState({view: e.target.value});
  }

  render() {

    var main = null;

    if(this.state.view === 'feed')  {
      if(this.state.user) {
        main = <Feed />;
      } else {
        main = <GoogleLogin
                 clientId="138477616168-pfaco7a1lrv2pjleqdg9b1vqi64joj5t.apps.googleusercontent.com"
                 buttonText="Login"
                 onSuccess={this.responseGoogle}
                 onFailure={this.responseGoogle}
               />;
      }
    } else if (this.state.view === 'list') {
      main = <List />
    } else if (this.state.view === 'enrollments') {
      main = <Enrollments />
    } else if (this.state.view === 'register') {
      main = <Register />
    }

    return (
      <div>
        <Header user={this.state.user} onNavClick={this.handleNavClick} />
        { main }
        <Footer />
      </div>
    )
  }
}

export default App;
