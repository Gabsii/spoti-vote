import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './pages/Loading.jsx';
import Login from './pages/Login.jsx';
import registerServiceWorker from './registerServiceWorker';

// preloads css => no render blocking
import './css/reset.css'; /* webpackPrefetch: true */
import './css/fonts.css'; /* webpackPrefetch: true */

const App = Loadable({
    loader: () => import('./pages/App.jsx'),
    loading: Loading
});
const Dashboard = Loadable({
    loader: () => import('./pages/Dashboard.jsx'),
    loading: Loading
});
const Join = Loadable({
    loader: () => import('./pages/Join.jsx'),
    loading: Loading
});
const Usage = Loadable({
    loader: () => import('./pages/Usage.jsx'),
    loading: Loading
});
const Rooms = Loadable({
    loader: () => import('./pages/Rooms.jsx'),
    loading: Loading
});
const Policies = Loadable({
    loader: () => import('./pages/Policies.jsx'),
    loading: Loading,
    delay: 500
});
const NotFound = Loadable({
    loader: () => import('./pages/NotFound.jsx'),
    loading: Loading
});

ReactDOM.render((
    <BrowserRouter>
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
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();