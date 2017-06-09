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

      var enrollmentList = [];

      for (var key in this.props.enrollments) {
        if (this.props.enrollments.hasOwnProperty(key)) {
          enrollmentList.push(this.props.enrollments[key]);
        }
      }

      return (
          <div>
            {
              enrollmentList.map(function(enrollmentListItem) {
                return (
                  <div key={enrollmentListItem._id}>
                    <h2>{enrollmentListItem.title}</h2>
                    <h3>Session: {enrollmentListItem.session}</h3>
                    <h3>Location: {enrollmentListItem.location}</h3>
                    <p>{enrollmentListItem.description}</p>
                  </div>
                )
              })
            }
          </div>
      )
    }
  }
}

export default Enrollments;
