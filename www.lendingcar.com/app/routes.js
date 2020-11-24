// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { loadPackageAction, loadInventoryAction } from 'containers/InventoryPage/actions';
import { loadCarAction } from 'containers/CarPage/actions';
import { loadLendingShowAction } from 'containers/LandingPage/actions';
import appSagas from 'containers/App/sagas';
import { createFormAction } from 'containers/BookingPage/actions';
import { generateTimeStampId } from 'utils/helpers';
import { debounce } from 'lodash';
import { push } from 'react-router-redux';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  const checkLogin = () => {
    const isLoggedIn = localStorage.accessToken;
    if (!isLoggedIn) {
      sessionStorage.setItem('preRoutePath', location.pathname);
      store.dispatch(push('/login'));
    }
    return isLoggedIn;
  };
  const savePreRoute = () => {
    const isLoggedIn = localStorage.accessToken;
    if (!isLoggedIn) {
      sessionStorage.setItem('preRoutePath', location.pathname);
    }
  };
  // Create reusable async injectors using getAsyncInjectors factory
  const {
    injectReducer,
    injectSagas,
  } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  injectSagas(appSagas);
  return [
    {
      path: '/inventory',
      name: 'inventoryPage',
      parents: ['landingPage'],
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/InventoryPage/reducer'),
          import('containers/InventoryPage/sagas'),
          import('containers/InventoryPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('inventoryPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    },
    {
      path: '/packages/:packageId',
      name: 'packages',
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/InventoryPage/reducer'),
          import('containers/InventoryPage/sagas'),
          import('containers/InventoryPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('packages', reducer.default);
          // injectSagas('packagesSaga', sagas.default);
          injectSagas(sagas.default);
          const packageId = nextState.params.packageId;
          store.dispatch(loadPackageAction(packageId));
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    },
    {
      path: '/c/:id',
      name: 'carPage',
      parents: ['landingPage', 'inventoryPage'],
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/CarPage/reducer'),
          import('containers/CarPage/sagas'),
          import('containers/CarPage'),
          import('containers/InventoryPage/reducer'),
          import('containers/InventoryPage/sagas'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component, inventoryPageReducer, inventoryPageSagas]) => {
          injectReducer('carPage', reducer.default);
          injectSagas(sagas.default);
          injectReducer('inventoryPage', inventoryPageReducer.default);
          injectSagas(inventoryPageSagas.default);
          const carId = nextState.params.id;
          store.dispatch(loadCarAction({ carId }));
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/d/:id',
      name: 'carLimitedInfoPage',
      getComponent: debounce((nextState, cb) => {
        const importModules = Promise.all([
          import('containers/CarPage/reducer'),
          import('containers/CarPage/sagas'),
          import('containers/CarPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('carPage', reducer.default);
          injectSagas(sagas.default);
          const carId = nextState.params.id;
          store.dispatch(loadCarAction({ carId }));
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/',
      name: 'landingPage',
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/LandingPage/reducer'),
          import('containers/LandingPage/sagas'),
          import('containers/LandingPage'),
          import('containers/InventoryPage/reducer'),
          import('containers/InventoryPage/sagas'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component, inventoryPageReducer, inventoryPageSagas]) => {
          injectReducer('landingPage', reducer.default);
          injectSagas(sagas.default);
          injectReducer('inventoryPage', inventoryPageReducer.default);
          injectSagas(inventoryPageSagas.default);
          store.dispatch(loadLendingShowAction());
          store.dispatch(loadInventoryAction());
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/inventory/booking',
      name: 'bookingPage',
      parents: ['landingPage', 'inventoryPage', 'carPage'],
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/BookingPage/reducer'),
          import('containers/BookingPage/sagas'),
          import('containers/BookingPage'),
          import('containers/InventoryPage/reducer'),
          import('containers/InventoryPage/sagas'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component, inventoryPageReducer, inventoryPageSagas]) => {
          injectReducer('bookingPage', reducer.default);
          // injectSagas('bookingPageSaga', sagas.default);
          injectSagas(sagas.default);
          injectReducer('inventoryPage', inventoryPageReducer.default);
          injectSagas(inventoryPageSagas.default);
          const bookingId = generateTimeStampId('temp', 10);
          store.dispatch(createFormAction(bookingId));
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/aboutUs',
      name: 'aboutUsPage',
      parents: ['landingPage'],
      getComponent: debounce((nextState, cb) => {
        savePreRoute();
        const importModules = Promise.all([
          import('containers/AboutUs/reducer'),
          import('containers/AboutUs/sagas'),
          import('containers/AboutUs'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('aboutUs', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/login',
      name: 'loginPage',
      parents: ['landingPage'],
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signupPage',
      parents: ['landingPage'],
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/forgetPassword',
      name: 'forgetPasswordPage',
      parents: ['landingPage'],
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '/profile',
      name: 'profilePage',
      parents: ['landingPage'],
      getComponent(location, cb) {
        if (!checkLogin()) return;
        import('containers/ProfilePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/myTrip',
      name: 'myTripPage',
      parents: ['landingPage'],
      getComponent: debounce((nextState, cb) => {
        if (!checkLogin()) return;
        const importModules = Promise.all([
          import('containers/MyTripPage/reducer'),
          import('containers/MyTripPage/sagas'),
          import('containers/MyTripPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('myTripPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      }, 50),
    }, {
      path: '/changePassword',
      name: 'changePasswordPage',
      parents: ['landingPage'],
      getComponent(location, cb) {
        if (!checkLogin()) return;
        import('containers/ChangePasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/myDocuments',
      name: 'myDocumentsPage',
      getComponent(location, cb) {
        if (!checkLogin()) return;
        import('containers/MyDocumentsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/resendVerifyEmail',
      name: 'ResendVerifyEmailPage',
      parents: ['landingPage'],
      getComponent(location, cb) {
        import('containers/ResendVerifyEmailPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/resetPassword',
      name: 'resetPasswordPage',
      parents: ['landingPage'],
      getComponent(location, cb) {
        import('containers/ResetPasswordPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/contactUs',
      name: 'contactUsPage',
      parents: ['landingPage'],
      getComponent(location, cb) {
        savePreRoute();
        import('containers/ContactUs')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/componentTest0',
      name: 'componentTestPage0',
      getComponent(location, cb) {
        import('containers/ComponentTestPage0')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/componentTest1',
      name: 'componentTestPage1',
      getComponent(location, cb) {
        import('containers/ComponentTestPage1')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/componentTest2',
      name: 'componentTestPage2',
      getComponent(location, cb) {
        import('containers/ComponentTestPage2')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/componentTest3',
      name: 'componentTestPage3',
      getComponent(location, cb) {
        import('containers/ComponentTestPage3')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent: debounce((nextState, cb) => {
        import('containers/NotFoundPage')
        .then(loadModule(cb))
          .catch(errorLoading);
      }, 50),
    }];
}
