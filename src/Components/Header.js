import React, { Component } from 'react';

class Header extends Component {
  render() {

    if (this.props.user) {

      if(this.props.user.role === "STUDENT") {
        return (
          <div>
            <button value="feed" onClick={this.props.onNavClick}>Feed</button>
            <button value="list" onClick={this.props.onNavClick}>List Classes</button>
            <button value="register" onClick={this.props.onNavClick}>Register</button>
            <button value="enrollments" onClick={this.props.onNavClick}>My Enrollments</button>
            <span>
              <img src={this.props.user.imageUrl} height="40px" alt=""/>Logged in as: {this.props.user.name}
            </span>
            <button onClick={this.props.onLogout}>Logout</button>
          </div>
        );
      } else if (this.props.user.role === "TEACHER") {
        return (
          <div>
            <button value="feed" onClick={this.props.onNavClick}>Feed</button>
            <button value="list" onClick={this.props.onNavClick}>List Classes</button>
            <button value="submission" onClick={this.props.onNavClick}>Submit New Class</button>
            <button value="instructing" onClick={this.props.onNavClick}>My Classes</button>
            <span>
              <img src={this.props.user.imageUrl} height="40px" alt=""/>Logged in as: {this.props.user.name}
            </span>
            <button onClick={this.props.onLogout}>Logout</button>
          </div>
        );
      }
    } else {
      return (
        <div>
          Login to see full menu options.
        </div>
      )
    }
  }
}

export default Header;
