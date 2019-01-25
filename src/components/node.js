import React, { Component } from 'react';
import PropTypes from 'prop-types';
var isStartSelected=false,isFinishSelected=false, isFreeSelected=false;
class Node extends Component {
        constructor(props) {
        super();
        let color=props.isStart?this.getColor('red'):props.isFinish?this.getColor('green'):this.getColor('black');
        this.state={
          node:props.node,
          color:color,
          isStart:props.isStart,
          isFinish:props.isFinish
        }
        this.setWalkable=props.setWalkable;
        this.updateNode=props.updateNode;
      }

      getColor=(color)=> {
        return {backgroundColor:color};
      }

      changeWalkable=()=>{
        const node=Object.assign({}, this.state.node);
        node.walkable=false;
        this.setState({color:this.getColor('grey'), node:node});
        this.setWalkable(node.y,node.x);
      }

    onMouseDown=(e)=>{
      if(this.state.isStart) {
          isStartSelected=true;
          this.setState({isStart:false});
       }
      else if(this.state.isFinish) {
        isFinishSelected=true;
        this.setState({isFinish:false});
      }
      else if(!isStartSelected&&!isFinishSelected&&!e.button&&!this.state.isFinish) {
          this.changeWalkable.call(this);

          isFreeSelected=true;
        }
        //e.button===0 if left button pressed
      }

    onMouseUp=(e)=>{
        if(isStartSelected) {
          this.updateNode('start',this.state.node.y,this.state.x);
          this.setState({isStart:true,color:this.getColor('red')});
          isStartSelected=false;
        }
        if(isFinishSelected) {
          this.updateNode('finish',this.state.node.y,this.state.x);
          this.setState({isFinish:true,color:this.getColor('green')});
          isFinishSelected=false;
        }
        if(isFreeSelected){
           this.changeWalkable.call(this);

           isFreeSelected=false;
         }
    }

    onMouseEnter=(e)=>{
      if(isStartSelected&&!this.state.isFinish&&this.state.node.walkable) this.setState({color:this.getColor('red')});
      if(isFinishSelected&&!this.state.isStart&&this.state.node.walkable) this.setState({color:this.getColor('green')});
      if(isFreeSelected&&!this.state.isFinish&&!this.state.isStart) this.changeWalkable.call(this);
    }

    onMouseLeave=(e)=>{
      if(isStartSelected&&!this.state.isFinish&&this.state.node.walkable) this.setState({color:this.getColor('black')});
      if(isFinishSelected&&!this.state.isStart&&this.state.node.walkable) this.setState({color:this.getColor('black')});
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
    updateNode:PropTypes.func
  }

export default Node;
