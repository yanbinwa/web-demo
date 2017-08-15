import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './index.scss';
import './font-awesome/font-awesome.min.css';

class JSONFormatter extends Component {
  constructor(props) {
    super(props);
  }

  typeof(object){
      var tf = typeof object,
          ts = Object.prototype.toString.call(object);
      return null === object ? 'Null' :
          'undefined' == tf ? 'Undefined'   :
          'boolean' == tf ? 'Boolean'   :
          'number' == tf ? 'Number'   :
          'string' == tf ? 'String'   :
          '[object Function]' == ts ? 'Function' :
          '[object Array]' == ts ? 'Array' :
          '[object Date]' == ts ? 'Date' : 'Object';
  };

  render() {
    const { data, indent_count } = this.props;
    var view = <span></span>;
    switch(this.typeof(data)){
        case 'Null' :
            view = <JSONNull data={data} indent_count={indent_count}></JSONNull>;
            break;
        case 'Boolean' :
            view = <JSONBoolean data={data} indent_count={indent_count}></JSONBoolean>;
            break;
        case 'Number' :
            view = <JSONNumber data={data} indent_count={indent_count}></JSONNumber>;
            break;
        case 'String' :
            view = <JSONString data={data} indent_count={indent_count}></JSONString>;
            break;
        case 'Array' :
            view = <JSONArray data={data} indent_count={indent_count}></JSONArray>;
            break;
        case 'Object' :
            view = <JSONObject data={data} indent_count={indent_count}></JSONObject>;
            break;
    }
    return view;

  }
}

class JSONNull extends Component {
  render() {
    return(
      <span className="json_null">{'null'}</span>
    );
  }
}

class JSONBoolean extends Component {

  render(){
    const {data} = this.props;
    return(
      <span className="json_boolean">{data}</span>
    );
  }
}

class JSONNumber extends Component {

  render() {
    const {data} = this.props;
    return(
      <span className="json_number">{data}</span>
    );
  }
}

class JSONString extends Component {
  render() {
    const {data} = this.props;
    const quote = '"';
    var res = data;
    // res = res.replace(/\</g,"&lt;");
    // res = res.replace(/\>/g,"&gt;");
    if(0 <= data.search(/^http/)){
        res = <a href={res} target="_blank" className="json_link">{res}</a>
    }

    return(
      <span className="json_string">{quote}{res}{quote}</span>
    );
  }
}

class JSONArray extends Component {
  constructor(props) {
    super(props);
    this.state = {hide: false};
  }

  handleCollapseClick() {
    this.setState({hide: !this.state.hide});
  }

  render() {
    const { data, indent_count } = this.props;
    const length = data.length;
    var renderedArray = data.map((v, k) => {
      var comma = '';
      if (k !== length-1) {
        comma = ','
      }
      return (
        <span key={k}>
          <IndentTab indent_count={indent_count}></IndentTab><JSONFormatter data={v} indent_count={indent_count+1}></JSONFormatter>{comma}
          <br/>
        </span>
      );
    });

    if (this.state.hide) {
      return (
        <span>
          <i className="pointer fa fa-plus-square-o" onClick={this.handleCollapseClick.bind(this)}></i>
          {' Array['}<span className="json_number">{' ' + data.length + ' '}</span>{'],'}
        </span>
      );
    } else {
      return (
        <span>
        <i className="pointer fa fa-minus-square-o" onClick={this.handleCollapseClick.bind(this)}></i>{'['}<br/>
          {renderedArray}
          <IndentTab indent_count={indent_count-1}></IndentTab>{']'}
        </span>
      );
    }

  }

}

class JSONObject extends Component {
  constructor(props) {
    super(props);
    this.state = {hide: false};
  }

  handleCollapseClick() {
    this.setState({hide: !this.state.hide});
  }

  render() {
    const { data, indent_count } = this.props;

    var tmp_array = [],
        keys = Object.keys(data),
        keysLen = keys.length;

    for (var i = 0; i < keysLen; i++) {
        var key = keys[i],
            comma = '';
        const val = data[key];
        if (i !== keysLen - 1) {
          comma = ',';
        }
        key = '"' + key + '":';
        tmp_array.push(
          <span key={key}>
            <IndentTab indent_count={indent_count}></IndentTab><span className="json_key">{key}</span>
            <JSONFormatter data={val} indent_count={indent_count+1}></JSONFormatter>{comma}
            <br/>
          </span>
        );
    }

    if (this.state.hide) {
      return (
        <span>
          <i className="pointer fa fa-plus-square-o" onClick={this.handleCollapseClick.bind(this)}></i>{' Object{...}'}
        </span>
      );
    } else {
      return (
        <span>
        <i className="pointer fa fa-minus-square-o" onClick={this.handleCollapseClick.bind(this)}></i>{'{'}<br/>
          {tmp_array}
          <IndentTab indent_count={indent_count-1}></IndentTab>
          {'}'}
        </span>
      );
    }
  }
}

class IndentTab extends Component {
  render() {
    const {indent_count} = this.props;
    var res = [];
    var i = 0;

    for (; i < indent_count; i++) {
      res.push(<span key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</span>);
    }

    return <span>{res}</span>;
  }
}

export default JSONFormatter;
