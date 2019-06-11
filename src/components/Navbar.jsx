import React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Consumer } from '../ContextProvider';
import { Title } from './welcome/Title';
import './navbar.css';
import { MediaPhone, MediaTablet } from './utility/media';
import { PhoneMenu } from './Nav/PhoneNav';

export function Navbar() {
  return (
    <Menu className="navbar">
      <Title position="navbar" />
      <Consumer>
        {({ user }) => (user ? (
          <>
            <MediaPhone>
              <PhoneMenu user={user} />
            </MediaPhone>
            <MediaTablet>
            I'm a tablet
            </MediaTablet>
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
