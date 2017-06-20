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
    this.handleRemovalClick = this.handleRemovalClick.bind(this);
    this.handleLiquidateClick = this.handleLiquidateClick.bind(this);
  }

  handleLiquidateClick(e) {
    this.props.onLiquidation(
      {
        gid: this.props.gid,
        courseId: this.state.managing._id,
        session: this.state.managing.session
      }
    )
  }

  handleRemovalClick(e) {
    this.props.onRemoval(
      {
        gid: e.target.value,
        session: this.state.managing.session,
        _id: this.state.managing._id
      }
    )
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

    var self = this;

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
                    <tr key={student.gid}>
                      <td><img src={student.imageUrl} alt=""/></td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td><button value={student.gid} onClick={self.handleRemovalClick}>Remove</button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.handleLiquidateClick} value={this.state.managing._id}>Liquidate Class</button>
        </div>
      )
    }
  }
}

export default Manage;
