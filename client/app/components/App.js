import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { AppBar } from 'material-ui';
import '../styles/app.scss';

const App = (props) => (
  <div className="min-full-height">
  <footer className="footer-theme">Copyright © 2016 竹间智能科技（上海）有限公司 · 沪 ICP 备15045042号</footer>
    { props.children }

  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
