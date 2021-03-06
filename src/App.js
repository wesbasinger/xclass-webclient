import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

// common components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';
import List from './Components/List';
import Register from './Components/Register';
import Enrollments from './Components/Enrollments';
import Message from './Components/Message';

// teacher role components
import Proxy from './Components/Proxy';
import Instructing from './Components/Instructing';
import Submission from './Components/Submission';

// admin role components
import Manage from './Components/Manage';

var $ = require('jquery');

const API_STEM = "https://ruv9fe9pzh.execute-api.us-east-1.amazonaws.com/dev/";

var globalMessage = "";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed',
      user: false,
      gid_token: "",
      classes: [],
      feeds: []
    }

    this.handleNavClick = this.handleNavClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegistrationSubmission = this.handleRegistrationSubmission.bind(this);
    this.handleCourseSubmission = this.handleCourseSubmission.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handleLiquidation = this.handleLiquidation.bind(this);
  }

  componentDidMount() {

    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "feeds",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({feeds: response})
    });

    $.ajax({
      method: "GET",
      url: API_STEM + "courses",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({classes: response})
    });
  }

  handleLiquidation(data) {

    var self = this;
    // this is a 3 layer nested AJAX call chain

    // first remove all users
    $.ajax({
      method: "PUT",
      url: API_STEM + "users/all/batch-removal",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify({
        session: data.session,
        course_id: data.courseId
      })
    }).done(function(response) {

      globalMessage = "All users have been removed, now removing instructor.";
      self.setState({view: "message"});
      // now we remove instructor from the course
      $.ajax({
        method: "PUT",
        url: API_STEM + "users/" + data.gid + "/remove-instructing",
        contentType: 'application/json',
        crossDomain: true,
        data: JSON.stringify({
          course_id: data.courseId
        })
      }).done(function(response) {

        globalMessage = "Instructor has been removed, now deleting the course.";
        self.setState({view: "message"});

        // last, we flat out delete the course
        $.ajax({
          method: "DELETE",
          url: API_STEM + "courses/" + data.courseId,
          contentType: 'application/json',
          crossDomain: true
        }).done(function(response) {

          globalMessage = "Course has been successfully liquidated.";
          self.setState({view: "message"});

        });
      });
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
          if(response.error) {
            globalMessage = response.error;
            self.setState({view: "message"});
          } else {
            self.setState({user: response});
          }
        });
      } else {
        self.setState({user: response});
      }
    });
  }

  handleRemoval(data) {

    console.log(data);

    var self = this;

    $.ajax({
      method: "PUT",
      url: API_STEM + "users/" + data.gid + "/remove-enrollment",
      contentType: 'application/json',
      data: JSON.stringify(data),
      crossDomain: true,
    }).done(function(response) {

      console.log(response);

      if(response.error) {
        globalMessage = response.error;
        self.setState({view: "message"});
      } else {
        globalMessage = "Successfully unset student enrollment.  Now removing from course...";
        self.setState({view: "message"});
        $.ajax({
          method: "PUT",
          url: API_STEM + "courses/" + data._id + "/remove-student",
          contentType: 'application/json',
          data: JSON.stringify(data),
          crossDomain: true,
        }).done(function(response) {
          if(response.error) {
            globalMessage = response.error;
            self.setState({view: "message"});
          } else {
            globalMessage = "Successfully removed student from course.  Refresh for current data.";
            self.setState({view: "message"});
          }
        });
      }
    });
  }

  handleCourseSubmission(data) {

    var gid = this.state.user.id;

    data['instructors'] = [gid];

    var self = this;

    globalMessage = "Submitting class...";

    this.setState({view: "message"});

    $.ajax({
      method: "POST",
      url: API_STEM + "courses",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify(data)
    }).done(function(response) {
      if(response.error) {
        globalMessage = response.error;
        self.setState({view: "message"})
      } else {
        $.ajax({
          method: "PUT",
          url: API_STEM + "users/" + gid + "/add-instructing",
          contentType: 'application/json',
          crossDomain: true,
          data: JSON.stringify(response)
        }).done(function(response) {
          self.setState({user: response});
          globalMessage = "Class submitted successfully.";
          self.setState({view: "message"});
        });
      }
    });
  }

  handleRegistrationSubmission(registrationObject) {

    var self = this;
    var gid = this.state.user.id;
    var data = this.state.user;

    if(!registrationObject.pick) {
      alert("you must pick a class");
    } else {

      if(registrationObject.proxy) {
        data = registrationObject;
      }

      $.ajax({
        method: "PUT",
        url: API_STEM + "courses/" + registrationObject.pick + "/add-student",
        contentType: 'application/json',
        data: JSON.stringify(data),
        crossDomain: true,
      }).done(function(response) {
        if(response.error) {
          globalMessage = response.error;
          self.setState({view: "message"});
        } else if (registrationObject.proxy) {
          globalMessage = "Successfully did a proxy registration.";
          self.setState({view: "message"})
        } else {
          $.ajax({
            method: "PUT",
            url: API_STEM + "users/" + gid + "/add-enrollment",
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(response) // this would be an updated course object
          }).done(function(response) {
            self.setState({user: response});
            globalMessage = "Successfully registered for current session.";
            self.setState({view: "message"});
          });
        }
      });
    }
  }

  handleNavClick(e) {
    this.setState({view: e.target.value});
  }

  handleLogout(e) {
    this.setState({user: false, gid_token: "", view: "feed"});
  }

  render() {

    var main = null;

    if(this.state.view === 'feed')  {
      if(this.state.user) {
        main = <Feed feeds={this.state.feeds}/>;
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
      main = <Enrollments API_STEM={API_STEM} enrollmentMap={this.state.user.enrollments} />
    } else if (this.state.view === 'register') {
      main = <Register onRegistrationSubmit={this.handleRegistrationSubmission} classes={this.state.classes} />
    } else if (this.state.view === 'message') {
      main = <Message message={globalMessage} />
    } else if (this.state.view === 'submission') {
      main = <Submission onFormSubmit={this.handleCourseSubmission} />
    } else if (this.state.view === 'instructing') {
      main = <Instructing API_STEM={API_STEM} instructingList={this.state.user.instructing} />
    } else if (this.state.view === 'proxy') {
      main = <Proxy onRegistrationSubmit={this.handleRegistrationSubmission} classes={this.state.classes} />
    } else if (this.state.view === 'manage') {
      main = <Manage
        onLiquidation={this.handleLiquidation} gid={this.state.user.id}
        classes={this.state.classes} onRemoval={this.handleRemoval} />
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
