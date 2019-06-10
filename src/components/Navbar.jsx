import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Consumer } from '../ContextProvider';
import { Title } from './welcome/Title';
import './navbar.css';
import { MediaPhone } from './utility/media';

export function Navbar() {
  return (
    <Menu className="navbar">
      <Title position="navbar" />
      <Consumer>
        {({ user }) => (user ? (
          <>
            <MediaPhone>
              <Button icon>
                <Icon name="bars" />
              </Button>
            </MediaPhone>
          </>
        ) : (
          <Button icon>
            <Icon name="sign-in" />
          </Button>
        ))}
      </Consumer>


    </Menu>
  );
}
