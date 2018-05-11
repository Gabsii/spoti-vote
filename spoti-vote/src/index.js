import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Login_old from './components/Login_old.jsx';
import Join from './components/Join.jsx';
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
		<Route path="/oldLogin" component={Login_old}/>
		<Route path="/join" component={Join}/>
	</div>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
