import React, { useState, useEffect } from 'react';
import {
  Button, Icon, Image, Header, Transition,
} from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import largeImg from './assets/gallery-lg.jpg';

export function GalleryButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 600); }, []);

  return (

    <Consumer>
      {({ history, showLogin }) => (
        <Transition visible={visible} animation="scale" duration={800}>
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
        </Transition>
      )
  }
    </Consumer>
  );
}
