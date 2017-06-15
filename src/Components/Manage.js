import React, { Component } from 'react';

class Manage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pick: "",
      managing: null
    }

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleOptionSubmit = this.handleOptionSubmit.bind(this);
  }

  handleOptionChange(e) {
    this.setState({pick: e.target.value})
  }

  handleOptionSubmit(e) {
    e.preventDefault();

    var self = this;

    this.props.classes.forEach(function(_class) {
      if(_class._id === self.state.pick) {
        self.setState({managing: _class})
      }
    })
  }

  render() {

    if(!this.state.managing) {
      return (
        <div>
          <form onSubmit={this.handleOptionSubmit}>
            <select value={this.state.pickk} onChange={this.handleOptionChange}>
              <option></option>
              {
                this.props.classes.map(function(open_class) {
                  return(
                    <option key={open_class._id} value={open_class._id}>
                      {open_class.title}
                    </option>
                  )
                })
              }
            </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{this.state.managing.title}</h1>
          <table>
            <thead>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Email</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.managing.students.map(function(student) {
                  return(
                    <tr>
                      <td><img src={student.imageUrl}/></td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td><button>Remove</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Manage;
