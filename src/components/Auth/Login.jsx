import React, { useState } from 'react';
import {
  Button, Form, Input, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function Login({ login, redirect }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const wait = ms => new Promise(r => setTimeout(r, ms));


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
    return wait(300);
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
          value={username}
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
          value={password}
          type="password"
          iconPosition="left"
          onChange={handleFieldChange}
        />
      </Form.Field>


      <Button
        type="submit"
        style={{ float: 'right' }}
        color="blue"
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          login(username, password)
            .then(showSuccess)
            .then(redirect)
            .catch(() => {
              setLoading(false);
              setUsername('');
              setPassword('');
            });
        }}
      >
                Sign In
      </Button>
    </Form>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};
