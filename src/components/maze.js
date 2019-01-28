import React, { Component } from 'react';
import Node from './node';
import UniqueId from 'react-html-id'
import PropTypes from 'prop-types';
var renderNodes=[];
class Maze extends Component {
      constructor(props) {
        super();
        this.PF = require('pathfinding');
        this.grid = new this.PF.Grid(props.width-4,props.height-4);
        this.state={
          nodes:this.grid.nodes,
          path:[]
        }
        this.start={x:this.getRandomX(),y:this.getRandomY()};
        this.finish={x:this.getRandomX(),y:this.getRandomY()};
        UniqueId.enableUniqueIds(this);
    }

    setWalkable=(y,x)=>{
      const nodes=this.state.nodes.slice(0);
      nodes[y][x].walkable=false;
      this.setState({nodes:nodes});
    }

    findPath=()=> {
      let finder = new this.PF.AStarFinder();
      let path = finder.findPath(this.start.x, this.start.y, this.finish.x, this.finish.y, this.grid);
      this.setState({path:path});
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
      let y=Math.floor(Math.random() * (this.state.nodes.length-1));
      if(!this.start) return y;
      else if(y!==this.start.y) return y;
      else {
        while(true) {
            let newy=Math.floor(Math.random() * (this.state.nodes.length-1));
            if(newy!==y) return newy;
        }
      }
    }

    getRandomX=()=> Math.floor(Math.random() * (this.state.nodes[0].length-1));

    isInPath=(node)=>{
      let isInPath=false;
      if(this.state.path.length) {
        this.state.path.map((value,index)=>{
            if(node.x===value[0]&&node.y===value[1]) {
              isInPath=true;
              return;
            }
        });
      }
      return isInPath;
    }

    getRenderResult=()=>{
      renderNodes=[];
      return (
        <div>
        <button onClick={this.findPath.bind(this)}>Find Path</button>
        <div className="container"> {
             this.state.nodes.map((value,index1)=>{
                let nodes = value.map((val,index2)=>{
                  let isStart= (index1===this.start.y&&index2===this.start.x)?true:false;
                  let isFinish= (index1===this.finish.y&&index2===this.finish.x)?true:false;
                  return (
                    <Node node={val}
                          isStart={isStart}
                          isFinish={isFinish}
                          findPath={this.findPath.bind(this)}
                          setWalkable={this.setWalkable.bind(this)}
                          updateNode={this.updateNode.bind(this)}
                          key={this.nextUniqueId()}
                          isInPath={this.isInPath(val)}
                          />
                  )
                });
                renderNodes.push(nodes);
                return ( <div className="row" key={this.nextUniqueId()}>{nodes}</div>);
              })

            }
        </div>
      </div>
      )
    }

    render() {
        let result= this.getRenderResult();
        return result;
    }
}

Maze.propTypes={
  width:PropTypes.number,
  height:PropTypes.number
}

export default Maze;
