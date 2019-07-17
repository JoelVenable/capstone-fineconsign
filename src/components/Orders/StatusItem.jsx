import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export function StatusItem({ label, time, color }) {
  return (
    <Label color={color}>
      {label}
      <Label.Detail>
        {new Date(time).toLocaleString('en-US', {
          hour12: true,
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </Label.Detail>
    </Label>
  );
}

StatusItem.propTypes = {
  label: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
