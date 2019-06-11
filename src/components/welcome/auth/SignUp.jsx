import React, { useState } from 'react';

import {
  Form, Input, Button, Checkbox,
} from 'semantic-ui-react';
import { Consumer } from '../../../ContextProvider';


export function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [terms, setTerms] = useState(false);


  // Update state whenever an input field is edited
  const handleFieldChange = (evt) => {
    if (evt.target.id === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.id === 'password') {
      setPassword(evt.target.value);
    } else if (evt.target.id === 'username') {
      setUsername(evt.target.value);
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
          placeholder="email"
          id="email"
          icon="mail"
          type="email"
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
        {({ register, showError }) => (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="blue"
            style={{ float: 'right' }}

            onClick={(e) => {
              e.preventDefault();
              if (terms) register(username, email, password);
              else {
                showError('Please accept the terms and conditions');
              }
            }}
          >
                Register New User
          </Button>
        )}
      </Consumer>
    </Form>
  );
}
