import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import AppProviders from './app/core/components/app-providers';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
