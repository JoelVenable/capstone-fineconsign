import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContextProvider } from './ResponsiveContextProvider';
import { UserContextProvider } from './UserContextProvider';


export function ContextWrapper({ children }) {
  return (
    <ResponsiveContextProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </ResponsiveContextProvider>
  );
}

ContextWrapper.propTypes = { children: PropTypes.node.isRequired };
