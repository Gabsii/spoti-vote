import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import './css/reset.css';
import './css/index.css';
// import App from './App';
// import Header from './components/Header.jsx';
import registerServiceWorker from './registerServiceWorker';
import ReallySmoothScroll from 'really-smooth-scroll';

ReallySmoothScroll.shim();

ReactDOM.render(<Login/>, document.getElementById('root'));
registerServiceWorker();
