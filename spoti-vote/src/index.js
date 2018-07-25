import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login.jsx';
import App from './pages/App.jsx';
import Join from './pages/Join.jsx';
import Usage from './pages/Usage.jsx';
import './css/reset.css';
import './css/fonts.css';
import registerServiceWorker from './registerServiceWorker';

import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render((<BrowserRouter>
    <div>
        <Route exact={true} path="/" component={Login}/>
        <Route path="/app" component={App}/>
        <Route path="/join" component={Join}/>
        <Route path="/usage" component={Usage}/>
    </div>

        </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
