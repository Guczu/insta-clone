import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './dist/css/main.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
      <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
            <div className="index--container">
              <App />
            </div>
        </React.StrictMode>
      </BrowserRouter>
      </Provider>
    </React.Fragment>
);
