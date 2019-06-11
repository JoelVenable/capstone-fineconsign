import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './ContextProvider';
import { ApplicationViews } from './ApplicationViews';


ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>

      <ApplicationViews />
    </ContextProvider>

  </BrowserRouter>,
  document.getElementById('root'),
);
