/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export class UserContextProvider extends PureComponent {
  state = {
    user: {},
    login: user => this.setState({ user }),
    logout: () => { console.log('Logout'); },
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
