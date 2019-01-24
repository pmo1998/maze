import React, { Component } from 'react';
import Node from './node';
import UniqueId from 'react-html-id'

class Maze extends Component {
      constructor(props) {
        super();
        let PF = require('pathfinding');
        let grid = new PF.Grid(props.width-4,props.height-4);
        this.nodes=grid.nodes;
        this.start={x:this.getRandomX(),y:this.getRandomY()};
        this.finish={x:this.getRandomX(),y:this.getRandomY()};
        UniqueId.enableUniqueIds(this);
    }

    setWalkable=(y,x)=>{
      this.nodes[y][x].walkable=false;

    }

    updateNode=(type,y,x)=>{
      if(type==='start'){
        this.start.x=x;
        this.start.y=y;
        console.log('Start has changed!');
      }
      if(type==='finish') {
        this.finish.x=x;
        this.finish.y=y;
        console.log('Finish has changed!');
      }
    }

    getRandomY=()=> {
      let y=Math.floor(Math.random() * (this.nodes.length-1));
      if(!this.start) return y;
      else if(y!==this.start.y) return y;
      else {
        while(true) {
            let newy=Math.floor(Math.random() * (this.nodes.length-1));
            if(newy!=y) return newy;
        }
      }
    }
    getRandomX=()=> Math.floor(Math.random() * (this.nodes[0].length-1));

    render() {
      return (

        <div className="container"> {
             this.nodes.map((value,index1)=>{
              let nodes = value.map((val,index2)=>{
                let isStart= (index1===this.start.y&&index2===this.start.x)?true:false;
                let isFinish= (index1===this.finish.y&&index2===this.finish.x)?true:false;
                return (
                  <Node node={val}
                        isStart={isStart}
                        isFinish={isFinish}
                        setWalkable={this.setWalkable.bind(this)}
                        updateNode={this.updateNode.bind(this)}
                        key={this.nextUniqueId()}/>
                )
              });

              return (
                <div className="row" key={this.nextUniqueId()}>{nodes}</div>
              )

              })
            }
        </div>
      )
    }
}

//getNextId={this.getNextId.bind(this)}
export default Maze;
