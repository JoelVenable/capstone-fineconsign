/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API } from '../modules/api/API';
import { ErrorDialog } from '../components/utility/ErrorDialog';


const Context = React.createContext();

export const { Consumer } = Context;

export class ContextProvider extends PureComponent {
  state = {
    user: JSON.parse(sessionStorage.getItem('userdata')),
    employees: [],
    customers: [],
    artists: [],
    login: (username, pw) => this.setState(this.doLogin(username, pw)),
    logout: () => this.setState(handleLogout()),
    showError: errorMessage => this.setState({ errorMessage, isErrorDialogVisible: true }),
    errorMessage: '',
    isErrorDialogVisible: false,
  }


  componentDidMount() {

  }


  doLogin = async (username, password) => {
    const user = await API.users.login(username, password).catch(this.handleInvalidLogin);
    if (user) {
      const { userType } = user;
      const [typeObj] = await API[`${userType}s`].getFromUserId(user.id);
      user[userType] = typeObj;
      console.log(user);
      sessionStorage.setItem('userdata', JSON.stringify(user));
      return user;
    }
    return null;
  }

  hideError= () => this.setState({ isErrorDialogVisible: false, errorMessage: '' })

  handleInvalidLogin = (error) => {
    console.log(error.message);
    this.state.showError(error.message);
  }

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

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


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
