import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ContextProvider } from './ContextProvider';

ReactDOM.render(<ContextProvider><BrowserRouter><App /></BrowserRouter></ContextProvider>, document.getElementById('root'));
