

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
  handleEmployeeSubmit,
  userType,
  username,
  email,
  password,
  showStepTwo,
}) {
  const [terms, setTerms] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);


  const toggleTerms = () => setTerms(!terms);

  const myFieldChange = (e) => {
    // clears error state, then passes the event through...
    setError(false);
    handleFieldChange(e);
  };


  return (
    <Form
      warning={warning}
      success={success}
      error={error}
      size="tiny"
      loading={loading}
    >
      <Form.Input
        placeholder="Username"
        value={username}
        id="username"
        icon="users"
        disabled={disabled}

        iconPosition="left"
        onChange={myFieldChange}
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
        disabled={disabled}
        value={email}
        icon="mail"
        type="email"
        iconPosition="left"
        onChange={myFieldChange}
      />
      <Form.Input
        placeholder="password"
        value={password}
        id="password"
        disabled={disabled}
        icon="lock"
        type="password"
        iconPosition="left"
        onChange={myFieldChange}
      />
      <Form.Field>
        <SelectUserType userType={userType} disabled={disabled} setUserType={handleUserTypeChange} />
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
        {({ showError, showConfirm }) => (
          <Button
            type="submit"
            disabled={disabled}
            variant="contained"
            color="blue"
            style={{ float: 'right' }}
            icon
            labelPosition="right"
            onClick={(e) => {
              e.preventDefault();
              if (terms) {
                setLoading(true);
                if (userType !== 'employee') {
                  handleStepOneSubmit()
                    .then(() => {
                      setSuccess(true);
                      setTimeout(showStepTwo, 1000);
                    })
                    .catch((errorMsg) => {
                      setError(true);
                      setLoading(false);
                    });
                } else {
                  showConfirm({
                    title: 'New Employee accounts require manual administrator approval', // REQUIRED.  The title of the message requesting delete confirmation
                    text: 'Are you sure you need an employee account?', // The inner content of text to be displayed
                    confirmAction: () => {
                      setLoading(false);
                      setDisabled(true);
                      handleEmployeeSubmit();
                    }, // Function called when action is confirmed
                    confirmBtnColor: 'blue', // String value.  Accepts color of confirmation button.
                    icon: 'id card', // String value or null.  Icon next to the title
                    btnIcon: 'send', // String value or null.  Icon inside the confirmation button
                    btnText: 'Send it!', // string value.  Defaults to "yes"
                  });
                }
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
