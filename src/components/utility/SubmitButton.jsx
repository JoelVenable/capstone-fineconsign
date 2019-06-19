import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import PropTypes from 'prop-types';

export function SubmitButton({
  initialIcon, disabled, defaultColor, buttonText, submitActionThatReturnsPromise, style,
}) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(defaultColor);
  const [icon, setIcon] = useState('edit');
  const [btnText, setbtnText] = useState(buttonText);

  function handleButtonClick(e) {
    e.preventDefault();
    setLoading(true);
    submitActionThatReturnsPromise().then(setButtonSuccess).catch(setButtonError);
  }

  function setButtonError() {
    setTimeout(() => {
      setLoading(false);
      setColor('orange');
      if (buttonText) setbtnText('error!');
      clearButtonStatus();
    }, 300);
  }

  function setButtonSuccess() {
    setTimeout(() => {
      setLoading(false);
      setIcon('check');
      setColor('green');
      if (buttonText) setbtnText('Submitted!');
      clearButtonStatus();
    }, 300);
  }

  function clearButtonStatus() {
    setTimeout(() => {
      setIcon(initialIcon);
      setColor(defaultColor);
      if (buttonText) setbtnText(buttonText);
    }, 1000);
  }

  return (
    <Button
      icon
      style={style}
      disabled={disabled}
      loading={loading}
      color={color}
      onClick={handleButtonClick}
    >
      <Icon name={icon} />
      {btnText}
    </Button>
  );
}

SubmitButton.propTypes = {
  initialIcon: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  disabled: PropTypes.bool,
  defaultColor: PropTypes.string,
  buttonText: PropTypes.string,
  submitActionThatReturnsPromise: PropTypes.func.isRequired,
};

SubmitButton.defaultProps = {
  disabled: false,
  defaultColor: null,
  buttonText: null,
  style: null,
};
