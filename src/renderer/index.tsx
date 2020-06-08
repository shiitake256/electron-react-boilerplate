import React from 'react';
import ReactDOM from 'react-dom';
// import 'w3-css/w3.css';
import { AppRoot } from './components/AppRoot';
import 'fontsource-roboto';

const body = document.getElementsByTagName('body')[0]
ReactDOM.render(<AppRoot />, body.appendChild(document.createElement('div')));
