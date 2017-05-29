import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';
import List from './Components/List';
import Register from './Components/Register';
import Enrollments from './Components/Enrollments';

var $ = require('jquery');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed',
      user: false,
      gid_token: ""
    }

    this.handleNavClick = this.handleNavClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

    var self = this;

    $.ajax({
      method: "GET",
      url: "https://2g7e8jd0q8.execute-api.us-east-1.amazonaws.com/dev/classes",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({classes: response})
    });
  }

  responseGoogle(response) {
    this.setState({user:response.profileObj, gid_token:response.tokenId});
  }

  handleNavClick(e) {
    this.setState({view: e.target.value});
  }

  handleLogout(e) {
    this.setState({user: false, gid_token: ""});
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
        <Header user={this.state.user} onNavClick={this.handleNavClick} onLogout={this.handleLogout}/>
        { main }
        <Footer />
      </div>
    )
  }
}

export default App;
