import React from 'react';
import ReactDOM from 'react-dom';
import Parallax from './components/Parallax.jsx';
import './css/index.css';
// import App from './App';
// import Header from './components/Header.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Parallax/>, document.getElementById('root'));
registerServiceWorker();
