import React, { PureComponent } from 'react';
import './App.css';
import { API } from './modules/API';

export class App extends PureComponent {
  componentDidMount() {
    API.storageLocations.read();
  }

  render() {
    return <></>;
  }
}
