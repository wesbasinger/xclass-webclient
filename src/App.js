import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Feed from './Components/Feed';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'feed'
    }
  }

  render() {

    var main = null;

    if(this.state.view == 'feed')  {
      main = <Feed />
    }

    return (
      <div>
        <Header />
        { main }
        <Footer />
      </div>
    )
  }
}

export default App;
