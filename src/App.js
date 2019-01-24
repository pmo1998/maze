import React, { Component } from 'react';
import './App.css';
import './styles/style.css';
import GenerateMazeButton from './components/greetingButton';
import Maze from './components/maze'


class App extends Component {
      getMazeWidth=()=>{
        return Math.trunc(window.screen.width/35);
      }
      getMazeHeight=()=> {
        return Math.trunc(window.screen.height/35);
      }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
            <Maze width={this.getMazeWidth()} height={this.getMazeHeight()}/>
        </div>
      </div>
    );
  }
}

export default App;
