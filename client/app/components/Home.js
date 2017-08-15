import React, { Component, PropTypes } from 'react';
// import JSONTree from 'react-json-tree'; // ref https://github.com/alexkuz/react-json-tree
import chiqParserAPI from '../utils/chiqParserAPI';
import commonParserAPI from '../utils/commonParserAPI';
import controllerAPI from '../utils/controllerAPI';
import intentAPI from '../utils/intentAPI';
import NLUAPI from '../utils/NLUAPI';

import JSONFormatter from '../libs/JSONFormatter';

import Loading from './Loading';
import ActionTab from './ActionTab';

const FILTER = {
  NLU: 'NLU',
  INTENT: 'intent',
  CONTROLLER: 'controller',
  PARSER: 'parser',
  COMMON_PARSER: 'common parser'
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      inputValue: '',
      jsonText: {},
      isLoading: false,
      selected: FILTER.CONTROLLER
    };
  }

  searchClick() {
    var filterTag = this.state.selected;
    if (this.state.inputValue == null || this.state.inputValue == "")
    {
      return;
    }
    this.setState({isLoading: true});
    switch(filterTag)
    {
      case FILTER.NLU:
        NLUAPI(this.state.inputValue, (res) => {
          this.setState({jsonText: res, isLoading: false});
        });
        break;

      case FILTER.INTENT:
        intentAPI(this.state.inputValue, (res) => {
          this.setState({jsonText: res, isLoading: false});
        });
        break;

      case FILTER.CONTROLLER:
        controllerAPI(this.state.inputValue, (res) => {
          this.setState({jsonText: res, isLoading: false});
        });
        break;

      case FILTER.PARSER:
        chiqParserAPI(this.state.inputValue, (res) => {
          this.setState({jsonText: res, isLoading: false});
        });
        break;

      case FILTER.COMMON_PARSER:
        commonParserAPI(this.state.inputValue, (res) => {
          this.setState({jsonText: res, isLoading: false});
        });
        break;
    }
  }

  onInputChange(event) {

    this.setState({
      inputValue: event.target.value,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.searchClick();
    }
  }

  handleFilter(filter, e) {
    this.setState({selected: filter});
  }

  renderTabs() {
    const { selected } = this.state;
    const tabs = [
      {bottom: "NLU", top: "分词", tag: "NLU"},
      {bottom: "INTENT", top:  "意图", tag: "INTENT"},
      {bottom: "CONTROL", top: "主控", tag: "CONTROLLER"},
      {bottom: "PARSER", top: "CHIQ", tag: "PARSER"},
      {bottom: "PARSER", top: "COMMON", tag: "COMMON_PARSER"}
    ];
    const tabViews = tabs.map((t, i) => {
      var focus = selected === FILTER[t.tag];
      return <ActionTab key={i} data={{focus: focus, top: t.top, bottom: t.bottom,  onClick: this.handleFilter.bind(this, FILTER[t.tag])}}  />
    })
    return (
      <div className="tabs">
        { tabViews }
      </div>
    )
  }

  renderHeaderInput() {
    const { inputValue } = this.state;
    const clearIcon = inputValue === "" ? "hide": "";
    return (
      <div className="header-input">
        <div className="input-field" >
          <div className="input-elem">
            <input type="search" className="search-box" value={ inputValue } placeholder={'点此输入语句'} onChange={ this.onInputChange }  onKeyPress={ this.handleKeyPress } ></input>
            <div className={ "cancel-button " + clearIcon } onClick={ ()=>this.setState({inputValue:""}) }>
              <i className="cancel glyphicon glyphicon-remove-circle"></i>
            </div>
          </div>
          <div className="submit-elem">
            <div className="submit-btn" onClick={this.searchClick}>查询</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const data = this.state.jsonText;
    var JSONField = "";
    var headerInput = this.renderHeaderInput();
    var tabs = this.renderTabs();
    if (data !== null) {
      JSONField = <JSONFormatter data={ data } indent_count={1} ></JSONFormatter>;
    }
    return (
      <div className="has-footer">
        <div className="header-bg">
          <div className="header-logo">
             <a className="logo" href="http://www.emotibot.com/"><img src={require('../images/logo.png')} alt="logo"/></a>
          </div>
          { headerInput }
        </div>
        <div className="body">
          { tabs }
          <Loading loading={this.state.isLoading}/>
          <div className="result-block">
            { JSONField }
          </div>
        </div>
      </div>
    )
  }
}
// <JSONTree data={ this.state.filteredText } shouldExpandNode={(key) => true} sortObjectKeys={(a, b) => {if (a === 'type' || a === 'version') return 1; return -1;}} hideRoot={true}/>
Home.propTypes = {

};

export default Home;
