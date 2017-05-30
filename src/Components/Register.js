import React, { Component } from 'react';

class Register extends Component {
  render() {

    var open_classes = this.props.classes.filter(function(_class) {
      return(_class.students.length < _class.capacity);
    });

    return (
      <div>
        <form>
          <select>
            {
              open_classes.map(function(open_class) {
                return(
                  <option key={open_class.id}>
                    {open_class.title}
                  </option>
                )
              })
            }
          </select>
        </form>
      </div>
    );
  }
}

export default Register;
