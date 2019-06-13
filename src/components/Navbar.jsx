import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Consumer } from '../ContextProvider';
import { Title } from './welcome/Title';
import './navbar.css';
import { MediaPhone, MediaTablet, MediaDesktop } from './utility/media';
import { PhoneMenu } from './Nav/PhoneNav';
import { TabletMenu } from './Nav/TabletNav';
import { ComputerMenu } from './Nav/ComputerNav';

export function Navbar() {
  return (
    <Menu className="navbar">
      <Title position="navbar" />
      <Consumer>
        {({ user, history }) => (
          <>
            <MediaPhone>
              <PhoneMenu user={user} history={history} />
            </MediaPhone>
            <MediaTablet>
              <TabletMenu user={user} history={history} />
            </MediaTablet>
            <MediaDesktop>
              <ComputerMenu user={user} history={history} />
            </MediaDesktop>
          </>
        )}
      </Consumer>


    </Menu>
  );
}
