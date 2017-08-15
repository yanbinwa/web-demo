import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import JSONTree from 'react-json-tree'; // ref https://github.com/alexkuz/react-json-tree

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { styleClass: 'hide'};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && !nextProps.loading) {
      this.setState({styleClass: 'hide'});
    }
    if (nextProps && nextProps.loading) {
      this.setState({styleClass: 'center'});
    }
  }
  render() {
    return (
      <div className={this.state.styleClass}>
        <span>读取中...</span>
      </div>
    )
  }
}
Loading.defaultProps = {
  loading: false
};
export default Loading;
