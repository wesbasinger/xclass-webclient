import React, { Component } from 'react';

class Manage extends Component {

  constructor(props) {
    super(props);

    this.state = {pick: ""}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({pick: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onRegistrationSubmit({pick: this.state.pick});
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.pickk} onChange={this.handleChange}>
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
  }
}

export default Manage;
