import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          Main
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
