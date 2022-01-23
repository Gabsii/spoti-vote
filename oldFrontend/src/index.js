import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Loading from './pages/Loading.jsx';
import Login from './pages/Login.jsx';
import * as serviceWorker from './serviceWorker';

// preloads css => no render blocking
import './css/reset.css'; /* webpackPrefetch: true */
import './css/fonts.css'; /* webpackPrefetch: true */

// dynamic imports for each route
const App = React.lazy(()=> import('./pages/App.jsx'));
const Dashboard = React.lazy(()=> import('./pages/Dashboard.jsx'));
const Join = React.lazy(()=> import('./pages/Join.jsx'));
const Usage = React.lazy(()=> import('./pages/Usage.jsx'));
const Rooms = React.lazy(()=> import('./pages/Rooms.jsx'));
const Policies = React.lazy(()=> import('./pages/Policies.jsx'));
const NotFound = React.lazy(()=> import('./pages/NotFound.jsx'));

ReactDOM.render((
    <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route exact={true} path="/" component={Login}/>
                <Route path="/app" component={App}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/join" component={Join}/>
                <Route path="/usage" component={Usage}/>
                <Route path="/policies" component={Policies}/>
                <Route path="/rooms" component={Rooms}/>
                <Route component={NotFound}/>
            </Switch>
        </Suspense>
    </BrowserRouter>
), document.getElementById('root'));
serviceWorker.register();
