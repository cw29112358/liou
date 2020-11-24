/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { useTransitions, withTransition } from 'react-router-transitions';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { notification } from 'antd';
import $ from 'jquery';
import 'sanitize.css/sanitize.css';
// bootstrap css is already in the index.html
// import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jasny-bootstrap/dist/css/jasny-bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'material-icons/css/material-icons.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-credit-card/source/card.css';
import 'react-credit-card/source/card-types.css';
import 'antd/dist/antd.css';
import 'styles/index.scss';
import 'styles/font.scss';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';

/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';
window.$ = window.jQuery = $;

// reDefine window.alert functin
notification.config({
  top: '50%',
  duration: 3,
});

window.alert = (title = 'Error', message = 'Something is wrong', type = 'error', duration = 3) => {
  if (typeof title !== 'string') {
    return console.error(`alert的title类型不是字符串,当前title为${title},当前title类型为${typeof title}`);
  } else if (typeof message !== 'string') {
    return console.error(`alert的message类型不是字符串,当前message为${message},当前message类型为${typeof message},`);
  }
  const typeList = ['success', 'error', 'info', 'warning'];
  if (!typeList.includes(type)) {
    return console.error('alert类型不正确!,正确类型有success, error, info, warning');
  }

  const key = new Date().getTime();
  notification[type]({
    key,
    message: title,
    description: message,
    duration,
  });
  return key;
};

window.alert.close = (key) => {
  notification.close(key);
};

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const hashOrBrowserHistory = location.protocol === 'file:' ? hashHistory : browserHistory;
// const hashOrBrowserHistory = hashHistory;
const initialState = {};
const store = configureStore(initialState, hashOrBrowserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(hashOrBrowserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: withTransition(App),
  childRoutes: createRoutes(store),
};

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            // applyRouterMiddleware(useScroll())
            applyRouterMiddleware(useTransitions({
              TransitionGroup: ReactCSSTransitionGroup,
              defaultTransition: {
                transitionName: 'fade',
                transitionEnterTimeout: 500,
                transitionLeaveTimeout: 300,
              },
            }), useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
