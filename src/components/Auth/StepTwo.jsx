import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Message, Icon, Button,
} from 'semantic-ui-react';


export function StepTwo({
  firstName,
  lastName,
  address,
  city,
  state,
  zipcode,
  username,
  password,
  handleFieldChange,
  handleStepTwoSubmit,
  login,
  redirect,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  return (
    <>
      <Form
      // warning={warning}
        success={success}
      // error={error}
        size="tiny"
        loading={loading}
      >
        <Form.Group widths="equal">
          <Form.Input
            placeholder="First Name"
            value={firstName}
            id="firstName"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="Last Name"
            value={lastName}
            id="lastName"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="Your street address"
            value={address}
            id="address"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="Your city"
            value={city}
            id="city"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="State"
            value={state}
            id="state"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="zipcode"
            value={zipcode}
            id="zipcode"
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/*

        <Message
          size="mini"
          error
          header="Username is already taken!"
          icon="cancel"
        /> */}
        <Message
          size="mini"
          success
          header="Success!"
          icon="check"
        />

        <Button
          type="submit"
          variant="contained"
          color="blue"
          style={{ float: 'right' }}
          icon
          labelPosition="left"
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            handleStepTwoSubmit()
              .then(() => {
                login(username, password);
                setSuccess(true);
                setTimeout(redirect, 600);
              });
          }}
        >
                   Register
          <Icon name="plus" />
        </Button>
      </Form>
    </>
  );
}


StepTwo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleStepTwoSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};
