import React, { Component } from 'react';

class Enrollments extends Component {
  render() {
    if(!this.props.enrollments) {
      return (
        <div>
          No current enrollments.
        </div>
      )
    } else {
      return (
          <div>
            {JSON.stringify(this.props.enrollments)}
          </div>
      )
    }
  }
}

export default Enrollments;
