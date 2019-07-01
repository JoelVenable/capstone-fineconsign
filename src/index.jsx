import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import FontLoader from 'react-google-font-loader';
import { ContextProvider } from './ContextProvider';
import { ApplicationViews } from './ApplicationViews';
import { UserProvider } from './AllUsersContext';


ReactDOM.render(
  <>
    <FontLoader fonts={[{
      font: 'Euphoria Script',
      weights: [400],
    }]}
    />
    <BrowserRouter>
      <ContextProvider>
        <UserProvider>
          <ApplicationViews />
        </UserProvider>
      </ContextProvider>
    </BrowserRouter>
  </>,
  document.getElementById('root'),
);
