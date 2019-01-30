import React from 'react';
import PropTypes from 'prop-types';
const Panel = props => {
  return (
    <div className="panel">
      <h2>Instructions</h2>
      <div>
      <p className="panel-text">Click within the grid and drag your mouse to draw obstacles. </p>
      <p className="panel-text">Drag the <span className="green">green</span> node to set the start position. </p>
      <p className="panel-text">Drag the <span className="red">red</span> node to set the end position. </p>
      <p className="panel-text">Click Find Path to show path from start to finish.</p>  </div>
      <button className="find-btn" onClick={props.find}>Find Path</button>
    </div>
  );
}

Panel.propTypes={
  find:PropTypes.func
}
export default Panel;
