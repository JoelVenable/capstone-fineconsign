import React from 'react';
import {
  Button, Icon, Responsive, Image, Header,
} from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import largeImg from './assets/gallery-lg.jpg';
import smallImg from './assets/gallery-sm.jpg';

export function GalleryButton() {
  return (

    <Consumer>
      {({ history, showLogin }) => (
        <div className="loginRegisterBox">
          <Header className="loginRegisterBox--header">Go to Gallery</Header>
          <Image
            src={largeImg}
            onClick={() => history.push('/gallery')}
            fluid
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              marginBottom: '2rem',
            }}
          />

          <Button
            fluid
            icon
            labelPosition="left"
            onClick={showLogin}
          >
            <Icon name="sign-in" />
Log in
          </Button>

        </div>

      )
  }
    </Consumer>
  );
}
