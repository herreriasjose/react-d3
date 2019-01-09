import React, { Component } from 'react';


import './bootstrap/css/bootstrap.css';
import './App.css'
import Layout from './containers/Layout'
import Map from './components/Map'

class App extends Component {



  render() {
    
    return (
      <div className="App App-bg">
        <header className="App-header jumbotron mybg">
          <h1 className="App-title text-primary d-flex justify-content-center">A Serverless React & D3 App using Firebase</h1>
          
        </header>
        <p className="App-intro">
         
        </p>
        <Layout>
          <Map size={[window.innerWidth/ 1.1, window.innerHeight / 2]} ></Map>
        </Layout>
      </div>
    );
  }
}

export default App;
