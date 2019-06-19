/* eslint react/no-unused-state: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { API } from './modules/api/API';

const Context = React.createContext();

export const { Consumer: UserConsumer } = Context;

export class UserProvider extends PureComponent {
  state = {
    users: [],
    get: {
      users: async () => this.setState({ users: await API.users.getAll() }),
    },
    add: {
      /* eslint-disable-next-line */
      user: newUser => API.users.create(newUser).then(this.state.get.users)
    },
    edit: {
      /* eslint-disable-next-line */
      user: (newUser, id) => API.users.edit(id, newUser).then(this.state.get.users),
    },
  }

  componentDidMount() {
    const { get } = this.state;
    get.users();
  }


  /* eslint-disable-next-line */


  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.state}>
        {children}


      </Context.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
