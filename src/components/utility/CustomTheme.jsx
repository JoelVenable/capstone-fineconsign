import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

const style = createMuiTheme({
  palette: {
    primary: {
      main: '#6E1EE8',
    },
    primaryDark: {
      main: '#5016A8',
    },
    secondary: { main: '#05B52D' },
    error: { main: '#DB3630' },
  },
});

export function CustomTheme({ children }) {
  return <ThemeProvider theme={style}>{children}</ThemeProvider>;
}

CustomTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
