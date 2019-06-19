import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const options = [
  {
    key: 'customer',
    text: 'Customer',
    value: 'customer',
    icon: 'user',
  },
  {
    key: 'artist',
    text: 'Artist',
    value: 'artist',
    icon: 'paint brush',
  },
  {
    key: 'employee',
    text: 'Employee',
    value: 'employee',
    icon: 'id card',
  },
];


export function SelectUserType({
  userType,
  setUserType,
}) {
  return (
    <Dropdown
      selection
      placeholder="Select user type"
      value={userType}
      onChange={(_e, { value }) => {
        setUserType(value);
      }}
      options={options}
    />
  );
}


SelectUserType.propTypes = {
  userType: PropTypes.oneOf(['customer', 'employee', 'artist']).isRequired,
  setUserType: PropTypes.func.isRequired,
};
