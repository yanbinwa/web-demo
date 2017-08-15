import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';


const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
  </Route>
);

export default routes;
