import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div>
        {
          this.props.classes.map(function(_class) {
            return (
              <div key={_class.id}>
                <h2>{_class.title}</h2>
                <p>{_class.description}</p>
                <p>{_class.capacity}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default List;
