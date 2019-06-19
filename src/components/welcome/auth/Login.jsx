import React, { useState } from 'react';
import {
  Button, Form, Input, Message,
} from 'semantic-ui-react';
import { Consumer } from '../../../ContextProvider';

export function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const wait = ms => new Promise((r, j) => setTimeout(r, ms));


  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    if (evt.target.id === 'username') {
      setUsername(evt.target.value);
    } else if (evt.target.id === 'password') {
      setPassword(evt.target.value);
    }
  };

  const showSuccess = async () => {
    setSuccess(true);
    return await wait(300);
  };


  return (
    <Form loading={loading} success={success}>
      <Message
        size="mini"
        success
        header="Success!"
        icon="check"
      />
      <Form.Field>
        <Input
          placeholder="Username"
          id="username"
          icon="users"
          iconPosition="left"
          onChange={handleFieldChange}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="password"
          id="password"
          icon="lock"
          type="password"
          iconPosition="left"
          onChange={handleFieldChange}
        />
      </Form.Field>


      <Consumer>
        {({ login, redirect }) => (
          <Button
            type="submit"
            style={{ float: 'right' }}
            color="blue"
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              login(username, password).then(showSuccess).then(redirect);
            }}
          >
                Sign In
          </Button>
        )}
      </Consumer>
    </Form>
  );
}
