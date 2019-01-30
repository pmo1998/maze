import React, { Component } from 'react';
import './App.css';
import './styles/style.css';
import Maze from './components/maze'

class App extends Component {
      getMazeWidth=()=>{
        return Math.trunc((window.screen.width)/28);
      }
      getMazeHeight=()=> {
        return Math.trunc((window.screen.height)/28);
      }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="wrapper">
              <Maze width={this.getMazeWidth()} height={this.getMazeHeight()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
