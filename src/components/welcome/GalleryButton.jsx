import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, Image, Header, Transition } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';
import largeImg from './assets/gallery-lg.jpg';

export function GalleryButton() {
  const [visible, setVisible] = useState(false);
  const { history, showLogin } = useContext(Context);
  useEffect(() => {
    setTimeout(() => setVisible(true), 600);
  }, []);

  return (
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

        <Button fluid icon labelPosition="left" onClick={showLogin}>
          <Icon name="sign-in" />
          Log in
        </Button>
      </div>
    </Transition>
  );
}
