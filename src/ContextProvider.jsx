/* eslint react/no-unused-state: 0 */
/* eslint react/no-direct-mutation-state: 0 */
/* eslint react/destructuring-assignment: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { API } from './modules/api/API';
import { ErrorDialog } from './components/utility/ErrorDialog';
import { firebaseCredentials } from './env/firebaseCredentials';
import 'firebase/firebase-storage';
import { ConfirmDialog } from './components/utility/ConfirmDialog';


const Context = React.createContext();

try {
  firebase.initializeApp(firebaseCredentials);
} catch (e) {
  /* eslint-disable-next-line */
  console.log("You'll need to create a firebase account and provide "
    + 'credentials inside /src/env/firebaseCredentials.js to use this app.'
    + '\n\nError message follows...\n\n', e);
}


export const { Consumer } = Context;

class Provider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(sessionStorage.getItem('userdata')),
      storageRef: firebase.storage().ref(),
      login: (username, pw) => this.doLogin(username, pw),
      logout: () => {
        sessionStorage.clear();
        this.setState({ user: null });
        /* eslint-disable-next-line */
        this.props.history.push("/");
      },
      /* eslint-disable-next-line */
      history: this.props.history,
      /* eslint-disable-next-line */
      showError: (errorMessage, optionalCallbackFunction) => {
        this.setState({ errorMessage, isErrorDialogVisible: true, handleErrorClose: optionalCallbackFunction });
      },
      showConfirm: confirmObject => this.setState({ confirmObject, isConfirmDialogVisible: true }),
      handleErrorClose: null,
      confirmObject: {},
      errorMessage: '',
      redirect: () => {
        const { location, history } = this.props;
        const { user } = this.state;
        if (location.pathname === '/') {
          if (user.userType === 'employee') history.push('/paintings');
          if (user.userType === 'artist') history.push('/paintings');
          if (user.userType === 'customer') history.push('/gallery');
        }
      },
      get: {},
      add: {},
      edit: {},
      remove: {},
      isErrorDialogVisible: false,
      isConfirmDialogVisible: false,
    };

    const endpoints = [
      'employees',
      'artists',
      'customers',
      'paintings',
      'orders',
      'orderItems',
      'priceAdjustments',
    ];
    endpoints.forEach((endpoint) => {
      //  the 'minus' variable chops off the 's' at the end of each endpoint
      //  i.e. add.painting() instead of add.paintings()
      const minus = endpoint.substring(0, endpoint.length - 1);
      this.state[endpoint] = [];
      this.state.get[endpoint] = async () => this.setState({ [endpoint]: await API[endpoint].getAll() });
      this.state.add[minus] = async obj => API[endpoint].create(obj).then(this.state.get[endpoint]);
      this.state.edit[minus] = (obj, id) => API[endpoint].edit(id, obj).then(this.state.get[endpoint]);
      this.state.remove[minus] = async id => API[endpoint].delete(id).then(this.state.get[endpoint]);
    });
  }


  componentDidMount() {
    const { get } = this.state;
    get.artists();
    get.paintings();
    get.employees();
    get.customers();
  }


  doLogin = async (username, password) => {
    const { showError } = this.state;
    sessionStorage.clear();
    const user = await API.users.login(username, password).catch(this.handleInvalidLogin);

    if (user) {
      if (!user.isActive) {
        showError('This user account has been deactivated!');
        return null;
      }
      const { userType } = user;
      const [typeObj] = await API[`${userType}s`].getFromUserId(user.id);
      user[userType] = typeObj;
      sessionStorage.setItem('userdata', JSON.stringify(user));
      // if (userType === 'customer') history.push('/gallery');
      // if (userType === 'artist' || userType === 'employee') {
      //   console.log('test passed');
      //   history.push('/paintings');
      // }
      this.setState({ user });
    }
    return null;
  }

  hideError = () => {
    const { handleErrorClose } = this.state;
    this.setState({ isErrorDialogVisible: false, errorMessage: '' });
    if (handleErrorClose) handleErrorClose();
  }

  hideConfirm = () => this.setState({ isConfirmDialogVisible: false, confirmObject: {} })


  /* eslint-disable-next-line */
  handleInvalidLogin = error => this.state.showError(error.message);


  render() {
    const { children } = this.props;
    const {
      isErrorDialogVisible, errorMessage, confirmObject, isConfirmDialogVisible,
    } = this.state;
    return (
      <Context.Provider value={this.state}>
        {children}
        <ErrorDialog title={errorMessage} hide={this.hideError} isVisible={isErrorDialogVisible} />
        <ConfirmDialog {...confirmObject} hide={this.hideConfirm} isVisible={isConfirmDialogVisible} />


      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};


export const ContextProvider = withRouter(Provider);
