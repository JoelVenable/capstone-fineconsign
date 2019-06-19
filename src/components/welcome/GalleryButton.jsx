import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';


export function GalleryButton() {
  return (

    <Consumer>
      {({ history }) => (
        <Button
          fluid
          icon
          labelPosition="left"
          primary
          onClick={() => history.push('/gallery')}
        >
          <Icon name="images outline" />
Go to Gallery
        </Button>
      )
  }
    </Consumer>
  );
}
