/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API } from '../modules/api/API';

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export class UserContextProvider extends PureComponent {
  state = {
    user: {},
    employees: {},
    customers: {},
    artists: {},
    userType: '',
    login: this.login,
    logout: () => { sessionStorage.clear(); },
  }

  componentDidMount() {
    console.log(sessionStorage.getItem('userdata'));
  }

  login = async (username, password) => {
    const user = await API.users.login(username, password);
    const { userType } = user;
    const [typeObj] = await API[userType].getFromUserId(user.id);
    this.setState({ user, userType, [userType]: typeObj });
    sessionStorage.setItem('userdata', JSON.stringify(user));
  }


  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={this.state}>
        {children}
      </UserContext.Provider>
    );
  }
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
