import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Login2 from './components/Login2.jsx';
import App from './components/App.jsx';
import './css/reset.css';
import './css/fonts.css';
import registerServiceWorker from './registerServiceWorker';

import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render((<BrowserRouter>
	<div>
		<Route exact={true} path="/" component={Login}/>
		<Route path="/app" component={App}/>
		<Route path="/newLogin" component={Login2}/>
	</div>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
