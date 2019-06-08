import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Consumer } from '../Context/ContextProvider';


export function Navbar() {
  return (
    <Menu>
      <Consumer>
        {({ user }) => (
          <h2>
            Hello
            {user.username}
          </h2>
        )}
      </Consumer>

      <div>Hello from navbar</div>

    </Menu>
  );
}
