import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <button value="feed" onClick={this.props.onNavClick}>Feed</button>
        <button value="list" onClick={this.props.onNavClick}>List Classes</button>
        <button value="register" onClick={this.props.onNavClick}>Register</button>
        <button value="enrollments" onClick={this.props.onNavClick}>My Enrollments</button>
      </div>
    );
  }
}

export default Header;
