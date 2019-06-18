import React from 'react';
import { UserList } from './UserList';
import { Consumer } from '../../ContextProvider';


export function Users() {
  return (
    <Consumer>
      {context => <UserList {...context} /> }

    </Consumer>
  );
}
