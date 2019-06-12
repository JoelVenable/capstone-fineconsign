/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router, withRouter } from 'react-router-dom';
import { API } from './modules/api/API';
import { ErrorDialog } from './components/utility/ErrorDialog';


const Context = React.createContext();

export const { Consumer } = Context;

class Provider extends PureComponent {
  state = {
    user: JSON.parse(sessionStorage.getItem('userdata')),
    employees: [],
    customers: [],
    artists: [],
    paintings: [],
    login: (username, pw) => this.setState(this.doLogin(username, pw)),
    logout: () => {
      sessionStorage.clear();
      this.setState({ user: null });
    },
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
    isErrorDialogVisible: false,
  }


  componentDidMount() {
    const { get } = this.state;
    get.artists();
    get.paintings();
    /* eslint-disable-next-line */
  }

  getAll = async (endpoint) => {
    this.setState({ [endpoint]: await API[endpoint].getAll() });
  }


  doLogin = async (username, password) => {
    const user = await API.users.login(username, password).catch(this.handleInvalidLogin);
    if (user) {
      const { userType } = user;
      const [typeObj] = await API[`${userType}s`].getFromUserId(user.id);
      const { push } = this.props.history;
      user[userType] = typeObj;
      sessionStorage.setItem('userdata', JSON.stringify(user));
      if (userType === 'customer') push('/paintings');
      if (userType === 'artist' || userType === 'employee') push('/painting-list');
      return user;
    }
    return null;
  }

  hideError= () => this.setState({ isErrorDialogVisible: false, errorMessage: '' })

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
};


export const ContextProvider = withRouter(Provider);

function handleLogout() {
  sessionStorage.clear();
  const newState = {
    user: null,
    employees: null,
    customers: null,
    artists: null,
    userType: null,
  };
  return newState;
}
