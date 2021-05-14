import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { SocketContext,socket } from './context/socket';
require('dotenv').config()
ReactDOM.render(
  <Provider store={store}>
     <SocketContext.Provider value={socket}>
     <App />
     </SocketContext.Provider>
 
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
