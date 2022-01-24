import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from './pages/Loading.jsx';
import Login from './pages/Login.jsx';
import * as serviceWorker from './serviceWorker';

// preloads css => no render blocking
import './css/reset.css'; /* webpackPrefetch: true */
import './css/fonts.css'; /* webpackPrefetch: true */

// dynamic imports for each route
const App = React.lazy(() => import('./pages/App.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const Join = React.lazy(() => import('./pages/Join.jsx'));
const Usage = React.lazy(() => import('./pages/Usage.jsx'));
const Rooms = React.lazy(() => import('./pages/Rooms.jsx'));
const Policies = React.lazy(() => import('./pages/Policies.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));

ReactDOM.render(
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route exact={true} path="/" element={<Login />} />
                <Route path="/app" element={<App />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/join" element={<Join />} />
                <Route path="/usage" element={<Usage />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route element={<NotFound />} />
            </Routes>
        </Suspense>
    </BrowserRouter>,
    document.getElementById('root')
);
serviceWorker.register();
