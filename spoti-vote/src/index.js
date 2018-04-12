import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import App from './components/App.jsx';
import './css/reset.css';
import './css/fonts.css';
import ReallySmoothScroll from 'really-smooth-scroll';
import registerServiceWorker from './registerServiceWorker';

import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

ReallySmoothScroll.shim();

ReactDOM.render((<BrowserRouter>
	<div>
		<Route exact={true} path="/" component={Login}/>
		<Route path="/app" component={App}/>
	</div>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
