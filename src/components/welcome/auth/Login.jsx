import React, { useState } from 'react';
import {
  Button, Checkbox, Form, Input,
} from 'semantic-ui-react';
import { Consumer } from '../../../ContextProvider';

export function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [terms, setTerms] = useState(false);


  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    if (evt.target.id === 'username') {
      setUsername(evt.target.value);
    } else if (evt.target.id === 'password') {
      setPassword(evt.target.value);
    }
  };

  const toggleCheck = () => setTerms(!terms);


  return (
    <Form>
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
      <Checkbox
        label="I accept the terms and conditions"
        checked={terms}
        onChange={toggleCheck}
      />

      <Consumer>
        {({ login, showError }) => (
          <Button
            type="submit"
            style={{ float: 'right' }}
            color="blue"
            onClick={(e) => {
              e.preventDefault();
              if (terms) login(username, password);
              else {
                showError('Please accept the terms and conditions');
              }
            }}
          >
                Sign In
          </Button>
        )}
      </Consumer>
    </Form>
  );
}
