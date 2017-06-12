import React, { Component } from 'react';

var $ = require("jquery");

class Enrollments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "enrollments" : []
    }
  }

  componentDidMount() {

    var self = this;

    var courseIds = []

    for( var key in this.props.enrollmentMap) {
      if (this.props.enrollmentMap.hasOwnProperty(key)) {
          courseIds.push(this.props.enrollmentMap[key]);
      }
    }

    var fullResults = [];

    courseIds.forEach(function(courseId) {
      $.ajax({
        method: "GET",
        url: self.props.API_STEM + "courses/" + courseId,
        contentType: 'application/json',
        crossDomain: true,
      }).done(function(response) {
        fullResults.push(response);
        if(fullResults.length === courseIds.length) {
          self.setState({enrollments: fullResults});
        }
      });
    })
  }

  render() {
    if(this.state.enrollments.length > 0) {
      return(
        <div>
          {
            this.state.enrollments.map(function(enrollment) {
              return(
                <div key={enrollment._id}>
                  <h1>{enrollment.title}</h1>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return(
        <div>
          <h1>Not enrolled in any classes...</h1>
        </div>
      )
    }
  }

}

export default Enrollments;
