/* eslint react/no-unused-state: 0 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const ResponsiveContext = React.createContext();

export const ResponsiveConsumer = ResponsiveContext.Consumer;

export class ResponsiveContextProvider extends PureComponent {
  state = {
    width: window.innerWidth,
  }


  componentDidMount = () => {
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth = () => {
    const width = window.innerWidth;

    console.log(width);
    this.setState({ width });
  }


  render() {
    const { children } = this.props;
    return (
      <ResponsiveContext.Provider value={this.state}>
        {children}
      </ResponsiveContext.Provider>
    );
  }
}

ResponsiveContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
