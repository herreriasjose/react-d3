import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './containers/Layout'
import Map from './components/Map'

class App extends Component {



  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A Serverless React & D3 App using AWS</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
         
        </p>
        <Layout>
        <Map size={[700,400]} ></Map>
        </Layout>
      </div>
    );
  }
}

export default App;
