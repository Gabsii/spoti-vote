import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login.jsx';
import App from './pages/App.jsx';
import Join from './pages/Join.jsx';
import Usage from './pages/Usage.jsx';
import NotFound from './pages/NotFound.jsx';
import './css/reset.css';
import './css/fonts.css';
import registerServiceWorker from './registerServiceWorker';

import {Route} from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';

ReactDOM.render((<BrowserRouter>
    <div>
        <Switch>
            <Route exact={true} path="/" component={Login}/>
            <Route path="/app" component={App}/>
            <Route path="/join" component={Join}/>
            <Route path="/usage" component={Usage}/>
            <Route component={NotFound}/>
        </Switch>
    </div>

</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
