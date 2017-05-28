import React, { Component } from 'react';

class Header extends Component {
  render() {

    if (this.props.user) {
      return (
        <div>
          <button value="feed" onClick={this.props.onNavClick}>Feed</button>
          <button value="list" onClick={this.props.onNavClick}>List Classes</button>
          <button value="register" onClick={this.props.onNavClick}>Register</button>
          <button value="enrollments" onClick={this.props.onNavClick}>My Enrollments</button>
          <button onClick={this.props.onLogout}>Logout</button>
        </div>
      );
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
