import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Context } from '../ContextProvider';
import './navbar.css';
import { MediaPhone, MediaTablet, MediaDesktop } from './utility/media';
import { PhoneMenu } from './Nav/PhoneNav';
import { TabletMenu } from './Nav/TabletNav';
import { ComputerMenu } from './Nav/ComputerNav';

export function Navbar() {
  const { user, history, location } = useContext(Context);

  return (
    <Menu className="navbar" style={{ backgroundColor: '#edf3f7' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          '@media (minWidth: 450px)': {
            width: '30%',
          },
        }}
      >
        <Menu.Header
          as="a"
          content="Fine Consign"
          style={{
            fontFamily: 'Euphoria Script',
            fontSize: '2.4rem',
            cursor: 'pointer',
            color: 'black',
          }}
          onClick={() => history.push('/gallery')}
        />
      </div>

      <MediaPhone>
        <PhoneMenu user={user} history={history} location={location} />
      </MediaPhone>
      <MediaTablet>
        <TabletMenu user={user} history={history} location={location} />
      </MediaTablet>
      <MediaDesktop>
        <ComputerMenu user={user} history={history} location={location} />
      </MediaDesktop>
    </Menu>
  );
}
