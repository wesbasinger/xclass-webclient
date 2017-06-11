import React, { Component } from 'react';

class Submission extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "capacity" : 20,
      "description" : "",
      "title" : "",
      "alternateLocation" : "",
      "session" : "",
      "location" : ""
    }

    this.handleCapacityChange = this.handleCapacityChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAlternateLocationChange = this.handleAlternateLocationChange.bind(this);
    this.handleSessionChange = this.handleSessionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCapacityChange(e) {
    this.setState({capacity: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleAlternateLocationChange(e) {
    this.setState({alternateLocation: e.target.value})
  }

  handleSessionChange(e) {
    this.setState({session: e.target.value})
  }

  handleLocationChange(e) {
    this.setState({location: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      title: "",
      session: "",
      description: "",
      location: "",
      alternateLocation: "",
      capacity: 20
    });
    this.props.onFormSubmit(this.state);
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input type="text" className="form-control" value={this.state.title}
              onChange={this.handleTitleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="session">Session: </label>
            <input type="text" className="form-control" value={this.state.session}
              onChange={this.handleSessionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <input type="text" className="form-control" value={this.state.description}
              onChange={this.handleDescriptionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Location: </label>
            <input type="text" className="form-control" value={this.state.location}
              onChange={this.handleLocationChange} />
          </div>
          <div className="form-group">
            <label htmlFor="alternateLocation">Alternate Location: </label>
            <input type="text" className="form-control" value={this.state.alternateLocation}
              onChange={this.handleAlternateLocationChange} />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity: </label>
            <input type="number" className="form-control" value={this.state.capacity}
              onChange={this.handleCapacityChange} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

export default Submission;
