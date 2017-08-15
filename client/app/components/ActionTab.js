import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ActionTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, top, bottom, focus } = this.props.data;
    const focusClass = focus? 'focus' : '';

    return (
      <div className={"tab " + focusClass } onClick={onClick}>
        <span className="top">{top}</span>
        <span className="bottom">{bottom}</span>
      </div>
    )
  }
}

ActionTab.defaultProps = {
  type: "tab",
  top: "",
  bottom: ""
};

export default ActionTab;
