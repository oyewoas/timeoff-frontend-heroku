import React, { Component } from 'react';
import LandingPage from './components/LandingPage/LandingPage'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.connecToServer = this.connecToServer.bind(this);
  }
  connecToServer() {
    fetch('/');
  }

  componentDidMount() {
    this.connecToServer();
  }
  render() {
    return (
        <LandingPage/> 
    );
  }
}

export default App;
