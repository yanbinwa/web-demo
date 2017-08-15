
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import routes from './routes';
import rootReducers from './reducers';

// const logger = createLogger();
//const store = createStore(null, applyMiddleware(logger, thunk));

renderApp();

function renderApp(store) {
  render(
    <Router history={ hashHistory } routes={ routes } />,
    document.getElementById('root')
  );
}

// function renderApp(store) {
//   render(
//     <Provider store= { store }>
//       <MuiThemeProvider muiTheme={ muiTheme }>
//         <Router history={ hashHistory } routes={ routes } />
//       </MuiThemeProvider>
//     </Provider>,
//     document.getElementById('root')
//   );
// }
