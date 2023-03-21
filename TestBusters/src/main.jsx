import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserContextProvider } from './context/UserContext';
import GlobalStyle from './styles/Global';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <GlobalStyle />
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
