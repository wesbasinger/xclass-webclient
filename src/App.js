import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';
import List from './Components/List';
import Register from './Components/Register';
import Enrollments from './Components/Enrollments';

var $ = require('jquery');

const API_STEM = "https://t35tzok505.execute-api.us-east-1.amazonaws.com/dev/";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed',
      user: false,
      gid_token: "",
      classes: []
    }

    this.handleNavClick = this.handleNavClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegistrationSubmission = this.handleRegistrationSubmission.bind(this);
  }

  componentDidMount() {

    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "classes",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({classes: response})
    });
  }

  responseGoogle(response) {

    const data = JSON.stringify(response.profileObj);

    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "users/" + response.profileObj.googleId,
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      if(response.userFound === false) {
        $.ajax({
          method: "POST",
          url: API_STEM + "users",
          contentType: 'application/json',
          data: data,
          crossDomain: true,
        }).done(function(response) {
          self.setState({user: response});
        });
      } else {
        self.setState({user: response});
      }
    });
  }

  handleRegistrationSubmission(pick) {

    var data = this.state.user;
    var gid = this.state.user.id;

    if(!pick) {
      alert("you must pick a class");
    } else {
      $.ajax({
        method: "PUT",
        url: API_STEM + "classes/" + pick,
        contentType: 'application/json',
        data: JSON.stringify(data),
        crossDomain: true,
      }).done(function(response) {
        if(response.error) {
          console.log(response.error);
        } else {
          $.ajax({
            method: "PUT",
            url: API_STEM + "users/" + gid,
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(response)
          }).done(function(response) {
            console.log(response);
          });
        }
      });
    }
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
      main = <List classes={this.state.classes} />
    } else if (this.state.view === 'enrollments') {
      main = <Enrollments />
    } else if (this.state.view === 'register') {
      main = <Register onRegistrationSubmit={this.handleRegistrationSubmission} classes={this.state.classes} />
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
