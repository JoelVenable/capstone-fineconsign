/* eslint react/no-unused-state: 0 */


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
  state = {
    user: JSON.parse(sessionStorage.getItem('userdata')),
    employees: [],
    customers: [],
    artists: [],
    paintings: [],
    storageRef: firebase.storage().ref(),
    login: (username, pw) => this.doLogin(username, pw).then(user => this.setState({ user })),
    logout: () => {
      sessionStorage.clear();
      this.setState({ user: null });
      /* eslint-disable-next-line */
      this.props.history.push("/");
    },
    /* eslint-disable-next-line */
    history: this.props.history,
    /* eslint-disable-next-line */
    register: () => { console.log('register!'); },
    showError: (errorMessage, handleClose) => {
      this.setState({ errorMessage, isErrorDialogVisible: true, handleErrorClose: handleClose });
    },
    showConfirm: confirmObject => this.setState({ confirmObject, isConfirmDialogVisible: true }),
    handleErrorClose: null,
    confirmObject: {},
    errorMessage: '',
    get: {
      artists: () => this.getAll('artists'),
      paintings: () => this.getAll('paintings'),
      employees: () => this.getAll('employees'),
      customers: () => this.getAll('customers'),
    },
    add: {
      artist: newArtist => this.add(newArtist, 'artists'),
      painting: newPainting => this.add(newPainting, 'paintings'),
      employee: newEmployee => this.add(newEmployee, 'employees'),
      customer: newCustomer => this.add(newCustomer, 'customers'),
    },
    edit: {
      artist: (newArtist, id) => this.update(newArtist, 'artists', id),
      painting: (newPainting, id) => this.update(newPainting, 'paintings', id),
      customer: (newCustomer, id) => this.update(newCustomer, 'customers', id),
      employee: (newEmployee, id) => this.update(newEmployee, 'employees', id),
    },
    remove: {
      artist: id => this.delete(id, 'artists'),
      painting: id => this.delete(id, 'paintings'),
      customer: id => this.delete(id, 'customers'),
      employee: id => this.delete(id, 'employees'),
    },
    isErrorDialogVisible: false,
    isConfirmDialogVisible: false,
  }


  componentDidMount() {
    const { get } = this.state;
    get.artists();
    get.paintings();
  }

  getAll = async (endpoint) => {
    this.setState({ [endpoint]: await API[endpoint].getAll() });
  }

  add = async (obj, endpoint) => {
    await API[endpoint].create(obj);
    this.getAll(endpoint);
  }

  update = (obj, endpoint, id) => {
    API[endpoint].edit(id, obj).then(() => this.getAll(endpoint));
  }

  delete = async (id, endpoint) => {
    await API[endpoint].delete(id);
    this.getAll(endpoint);
  }


  doLogin = async (username, password) => {
    sessionStorage.clear();
    const user = await API.users.login(username, password).catch(this.handleInvalidLogin);
    if (user) {
      const { userType } = user;
      const [typeObj] = await API[`${userType}s`].getFromUserId(user.id);
      const { history } = this.props;
      user[userType] = typeObj;
      sessionStorage.setItem('userdata', JSON.stringify(user));
      if (userType === 'customer') history.push('/gallery');
      if (userType === 'artist' || userType === 'employee') history.push('/paintings');
      return user;
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
};


export const ContextProvider = withRouter(Provider);
