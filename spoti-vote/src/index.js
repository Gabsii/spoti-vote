import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import './css/reset.css';
import './css/index.css';
// import App from './App';
// import Header from './components/Header.jsx';
import ReallySmoothScroll from 'really-smooth-scroll';
import registerServiceWorker from './registerServiceWorker';

ReallySmoothScroll.shim();

// const colors = {
// 	background: "#191414",
// 	green: "#1DB954",
// 	greenCard: "#F1C40F",
// 	blueCard: "#3498DB",
// 	redCard: "#E74C3C",
// 	yellowCard: "#F1C40F",
// 	font: "#FFFFFF"
// }

ReactDOM.render(<Login/>, document.getElementById('root'));
registerServiceWorker();
