import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContextProvider } from './ResponsiveContextProvider';
import { ContextProvider } from './ContextProvider';


export function ContextWrapper({ children }) {
  return (
    <ResponsiveContextProvider>
      <ContextProvider>
        {children}
      </ContextProvider>
    </ResponsiveContextProvider>
  );
}

ContextWrapper.propTypes = { children: PropTypes.node.isRequired };
