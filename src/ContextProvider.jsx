/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { API } from './modules/api/API';
import { ErrorDialog } from './components/utility/ErrorDialog';
import { firebaseCredentials } from './env/firebaseCredentials';
import 'firebase/firebase-storage';

const Context = React.createContext();

try {
  firebase.initializeApp(firebaseCredentials);
} catch (e) {
  console.log("You'll need to create a firebase account and provide "
  + 'credentials inside /src/env/firebaseCredentials.js to use this app.');
  console.log('Error message follows...', e);
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
    login: (username, pw) => this.setState(this.doLogin(username, pw)),
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
    showError: errorMessage => this.setState({ errorMessage, isErrorDialogVisible: true }),
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
    delete: {
      artist: id => this.delete(id, 'artists'),
      painting: id => this.delete(id, 'paintings'),
      customer: id => this.delete(id, 'customers'),
      employee: id => this.delete(id, 'employees'),
    },
    isErrorDialogVisible: false,
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

  update = async (obj, endpoint, id) => {
    await API[endpoint].edit(id, obj);
    this.getAll(endpoint);
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

  hideError = () => this.setState({ isErrorDialogVisible: false, errorMessage: '' })

  /* eslint-disable-next-line */
  handleInvalidLogin = error => this.state.showError(error.message);


  render() {
    const { children } = this.props;
    const { isErrorDialogVisible, errorMessage } = this.state;
    return (
      <Context.Provider value={this.state}>
        {children}
        <ErrorDialog title={errorMessage} hide={this.hideError} isVisible={isErrorDialogVisible} />

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
