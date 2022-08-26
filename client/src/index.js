/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import 'bootstrap/dist/css/bootstrap.min.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './components/App/App';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
