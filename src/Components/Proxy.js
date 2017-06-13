import React, { Component } from 'react';

class Proxy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      proxy: true,
      pick: "",
      name: "",
      "email": ""
    }

    this.handlePickChange = this.handlePickChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePickChange(e) {
    this.setState({pick: e.target.value})
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onRegistrationSubmit(this.state);
  }

  render() {

    var open_classes = this.props.classes.filter(function(_class) {
      return(_class.students.length < _class.capacity);
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" onChange={this.handleNameChange} value={this.state.name} />
          <label htmlFor="email">Email: </label>
          <input type="email" onChange={this.handleEmailChange} value={this.state.email} />
          <select value={this.state.pick} onChange={this.handlePickChange}>
            <option></option>
            {
              open_classes.map(function(open_class) {
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
  }
}

export default Proxy;
