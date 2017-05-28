import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';
import List from './Components/List';
import Register from './Components/Register';
import Enrollments from './Components/Enrollments';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed'
    }

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(e) {
    this.setState({view: e.target.value});
  }

  render() {

    var main = null;

    if(this.state.view === 'feed')  {
      main = <Feed />
    } else if (this.state.view === 'list') {
      main = <List />
    } else if (this.state.view === 'enrollments') {
      main = <Enrollments />
    } else if (this.state.view === 'register') {
      main = <Register />
    }

    return (
      <div>
        <Header onNavClick={this.handleNavClick} />
        { main }
        <Footer />
      </div>
    )
  }
}

export default App;
