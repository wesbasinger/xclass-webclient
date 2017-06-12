import React, { Component } from 'react';

var $ = require("jquery");

class Instructing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "instructing" : []
    }
  }

  componentDidMount() {

    var self = this;

    var fullResults = [];

    this.props.instructingList.forEach(function(courseId) {
      $.ajax({
        method: "GET",
        url: self.props.API_STEM + "courses/" + courseId,
        contentType: 'application/json',
        crossDomain: true,
      }).done(function(response) {
        fullResults.push(response);
        if(fullResults.length === self.props.instructingList.length) {
          self.setState({instructing: fullResults});
        }
      });
    })
  }

  render() {

    if(this.state.instructing.length > 0) {
      return(
        <div>
          {
            this.state.instructing.map(function(instructing) {
              return(
                <div key={instructing._id}>
                  <h1>{instructing.title}</h1>
                  <table>
                    <thead>
                      <tr>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Grade</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        instructing.students.map(function(student) {
                          return(
                            <tr key={student.email}>
                              <td><img src={student.imageUrl} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JwlmFLmAhtLDggXumqt1lcqIcoVAfmxY53lYz4SuaWztjsZKDQ"/></td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>To be implemented...</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return(
        <div>
          <h1>Not instructing in any classes...</h1>
        </div>
      )
    }
  }

}

export default Instructing;
