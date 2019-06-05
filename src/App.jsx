import React, { PureComponent } from 'react';
import './App.css';
import { API } from './modules/API';

import { CustomTheme } from './CustomTheme';

export class App extends PureComponent {
  render() {
    return <CustomTheme>Content...</CustomTheme>;
  }
}
