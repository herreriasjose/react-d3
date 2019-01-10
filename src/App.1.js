import React, { Component } from "react";

import "./bootstrap/css/bootstrap.css";
import "./App.css";
import Layout from "./containers/Layout";
import Map from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="App App-bg ">
        <header className="App-header jumbotron App-bg jumbotron-fluid">
          <div className="col-md-12">
            <div className="row">
              <div className="col-1 col-sm-1 col-md-1 col-lg-4 col-xl-4" />
              <div className="col-10 col-sm-10 col-md-10 col-lg-4 col-xl-4">
                <h1 className="App-title text-primary d-flex justify-content-center ">
                  A Serverless React & D3 App using Firebase
                </h1>
              </div>
              <div className="col-1 col-sm-1 col-md-1 col-lg-4 col-xl-4" />
            </div>
          </div>
        </header>
        <Layout>
          <Map size={[window.innerWidth / 1.1, window.innerHeight / 2]} />
        </Layout>
      </div>
    );
  }
}

export default App;
