

import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../../ContextProvider';
import { SelectUserType } from '../../utility/SelectUserType';

export function StepOne({
  warning,
  handleFieldChange,
  handleUserTypeChange,
  handleStepOneSubmit,
  userType,
  username,
  email,
  password,
  showStepTwo,
}) {
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const toggleTerms = () => setTerms(!terms);

  const myFieldChange = (e) => {
    setError(false);
  };


  return (
    <Form
      warning={warning}
      success={success}
      error={error}
      size="tiny"
      loading={loading}
      disabled={disabled}
    >
      <Form.Input
        placeholder="Username"
        value={username}
        id="username"
        icon="users"
        iconPosition="left"
        onChange={handleFieldChange}
      />
      <Message
        size="mini"
        success
        header="Username is availble!"
        icon="check"
      />
      <Message
        size="mini"
        error
        header="Username is already taken!"
        icon="cancel"
      />
      <Form.Input
        placeholder="email"
        id="email"
        value={email}
        icon="mail"
        type="email"
        iconPosition="left"
        onChange={handleFieldChange}
      />
      <Form.Input
        placeholder="password"
        value={password}
        id="password"
        icon="lock"
        type="password"
        iconPosition="left"
        onChange={handleFieldChange}
      />
      <Form.Field>
        <SelectUserType userType={userType} setUserType={handleUserTypeChange} />
      </Form.Field>
      <Message
        size="mini"
        warning
        header="Employee accounts require administrator approval!"
        icon="alarm"
      />
      <Checkbox
        label="I accept the terms and conditions"
        checked={terms}
        onChange={toggleTerms}
      />

      <Consumer>
        {({ showError }) => (
          <Button
            type="submit"
            variant="contained"
            color="blue"
            style={{ float: 'right' }}
            icon
            labelPosition="right"
            onClick={(e) => {
              e.preventDefault();
              if (terms) {
                setLoading(true);
                handleStepOneSubmit()
                  .then(() => {
                    setSuccess(true);
                    setTimeout(showStepTwo, 1500);
                  })
                  .catch(() => {
                    setError(true);
                    setLoading(false);
                  });
              } else {
                showError('Please accept the terms and conditions');
              }
            }}
          >
                Continue
            <Icon name="right arrow" />
          </Button>
        )}
      </Consumer>
    </Form>
  );
}


StepOne.propTypes = {
  warning: PropTypes.bool.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleUserTypeChange: PropTypes.func.isRequired,
  handleStepOneSubmit: PropTypes.func.isRequired,
  userType: PropTypes.oneOf(['employee', 'customer', 'artist']).isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  showStepTwo: PropTypes.func.isRequired,
};
