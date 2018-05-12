import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';
import configureStore from './store/configureStore';

// Create store
const store = configureStore();

const appRoot = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(appRoot, document.getElementById('root'))