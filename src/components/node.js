import React, { Component } from 'react';
import PropTypes from 'prop-types';
var isStartSelected=false,isFinishSelected=false, isFreeSelected=false;
class Node extends Component {
        constructor(props) {
        super();
        this.node=props.node;
        this.isStart=props.isStart;
        this.isFinish=props.isFinish;
        this.setWalkable=props.setWalkable;
        this.updateNode=props.updateNode;
        let color=props.isStart?this.getColor('red'):props.isFinish?this.getColor('green'):this.getColor('black');
        this.state={
          color:color
        }
      }
      componentWillReceiveProps(nextProps) {
        if(!nextProps.isInPath&&this.state.color.backgroundColor==='yellow') {
              this.setState({color:this.getColor('black')});
        }
        if(nextProps.isInPath&&!this.isStart&&!this.isFinish){
          this.setState({color:this.getColor('yellow')});
        }
       }

      getColor=(color)=> {
        return {backgroundColor:color};
      }

      changeWalkable=()=>{
        this.node.walkable=false;
        //this.setState({color:this.getColor('grey')});
        this.setWalkable(this.node.y,this.node.x);
      }


    onMouseDown=(e)=>{
      if(this.isStart) {
          isStartSelected=true;
          this.isStart=false;
       }
      else if(this.isFinish) {
        isFinishSelected=true;
        this.isFinish=false;
      }
      else if(!isStartSelected&&!isFinishSelected&&!e.button&&!this.isFinish) {
         this.setState({color:this.getColor('grey')});
          this.changeWalkable.call(this);
          isFreeSelected=true;
        }
        //e.button===0 if left button pressed
      }

    onMouseUp=(e)=>{
        if(isStartSelected) {

          this.updateNode('start',this.node.x,this.node.y);
          this.isStart=true;
          this.setState({color:this.getColor('red')});
          isStartSelected=false;
        }
        if(isFinishSelected) {
          this.updateNode('finish',this.node.x,this.node.y);
          this.isFinish=true;
          this.setState({color:this.getColor('green')});
          isFinishSelected=false;
        }
        if(isFreeSelected){
           this.changeWalkable.call(this);
           isFreeSelected=false;
         }
    }

    onMouseEnter=(e)=>{
      if(isStartSelected&&!this.isFinish&&this.node.walkable) this.setState({color:this.getColor('red')});
      if(isFinishSelected&&!this.isStart&&this.node.walkable) this.setState({color:this.getColor('green')});
      if(isFreeSelected&&!this.isFinish&&!this.isStart) {
        this.setState({color:this.getColor('grey')});
        this.changeWalkable.call(this);
      }
    }

    onMouseLeave=(e)=>{
      if(isStartSelected&&!this.isFinish&&this.node.walkable) this.setState({color:this.getColor('black')});
      if(isFinishSelected&&!this.isStart&&this.node.walkable) this.setState({color:this.getColor('black')});
  }

      render() {
        return(
            <div className="node" style={this.state.color}
                 onMouseDown ={this.onMouseDown.bind(this)}
                 onMouseEnter ={this.onMouseEnter.bind(this)}
                 onMouseLeave ={this.onMouseLeave.bind(this)}
                 onMouseUp ={this.onMouseUp.bind(this)}
            >
            </div>
        );
      };

  }

  Node.propTypes={
    node:PropTypes.object,
    isStart:PropTypes.bool,
    isFinish:PropTypes.bool,
    setWalkable:PropTypes.func,
    updateNode:PropTypes.func,
    isInPath:PropTypes.bool
  }

export default Node;
