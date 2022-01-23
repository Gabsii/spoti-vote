import React from 'react';
import ReactDOM from 'react-dom';

import App from '../pages/App';
import Card from '../components/App/Cards/Card';
import CardContainer from '../components/App/Cards/CardContainer';
import ShareButton from '../components/App/Cards/ShareButton';
import Footer from '../components/App/Footer';
import PlayButtons from '../components/App/Footer/PlayButtons';
import ProgressBar from '../components/App/Footer/ProgressBar';
import SongAggregation from '../components/App/Footer/SongAggregation';
import SongIcon from '../components/App/Footer/SongIcon';
import VolumeBar from '../components/App/Footer/VolumeBar';
import AppSidebar from '../components/App/AppSidebar';
import Infos from '../components/App/AppSidebar/Infos';
import SettingsBar from '../components/App/AppSidebar/SettingsBar';
import RerollButton from '../components/App/AppSidebar/RerollButton';
import User from '../components/App/AppSidebar/User';
import UserContainer from '../components/App/AppSidebar/UserContainer';

import Dashboard from '../pages/Dashboard';
import Main from '../components/Dashboard/Main';
import Carousel from '../components/Dashboard/Main/Carousel';
import Logins from '../components/Dashboard/Main/Logins';
import Spinner from '../components/Dashboard/Main/Spinner';
import TopType from '../components/Dashboard/Main/TopType';

import SharedSidebar from '../components/Shared/SharedSidebar';
import Profile from '../components/Shared/SharedSidebar/Profile';
import Navbar from '../components/Shared/SharedSidebar/Navbar';

import Rooms from '../pages/Rooms';
import Room from '../components/Rooms/Room';
import RoomContainer from '../components/Rooms/RoomContainer';

import Join from '../pages/Join';
import Loading from '../pages/Loading';

import Login from '../pages/Login';
import BarItem from '../components/Login/BarItem';
import CookieMessage from '../components/Login/CookieMessage';
import Header from '../components/Login/Header';
import LoginButton from '../components/Login/LoginButton';
import LoginButtonSecondary from '../components/Login/LoginButtonSecondary';
import LoginCode from '../components/Login/LoginCode';
import LoginFooter from '../components/Login/LoginFooter';
import NavItem from '../components/Login/NavItem';
import Reason from '../components/Login/Reason';
import SocialIcon from '../components/Login/SocialIcon';

import NotFound from '../pages/NotFound';

import Policies from '../pages/Policies';

import Usage from '../pages/Usage';

describe('Pages render', () => {
    describe('App components render', () => {
        it('App', () => {
            const div = document.createElement('div');
            ReactDOM.render(<App/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        it('App Footer', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Footer/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        it('App Sidebar', () => {
            const div = document.createElement('div');
            ReactDOM.render(<AppSidebar/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        describe('App Cards components render', () => {
            it('Card', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Card/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });

            it('CardContainer', () => {
                const div = document.createElement('div');
                ReactDOM.render(<CardContainer/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });

            it('ShareButton', () => {
                const div = document.createElement('div');
                ReactDOM.render(<ShareButton/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
        describe('App Footer components render', () => {
            it('PlayButtons', () => {
                const div = document.createElement('div');
                ReactDOM.render(<PlayButtons/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('ProgressBar', () => {
                const div = document.createElement('div');
                ReactDOM.render(<ProgressBar/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('SongAggregation', () => {
                const div = document.createElement('div');
                ReactDOM.render(<SongAggregation/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('SongIcon', () => {
                const div = document.createElement('div');
                ReactDOM.render(<SongIcon/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('VolumeBar', () => {
                const div = document.createElement('div');
                ReactDOM.render(<VolumeBar/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
        describe('App Sidebar components render', () => {
            it('Infos', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Infos/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('SettingsBar', () => {
                const div = document.createElement('div');
                ReactDOM.render(<SettingsBar/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('RerollButton', () => {
                const div = document.createElement('div');
                ReactDOM.render(<RerollButton/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('User', () => {
                const div = document.createElement('div');
                ReactDOM.render(<User/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('UserContainer', () => {
                const div = document.createElement('div');
                ReactDOM.render(<UserContainer/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
    });

    describe('Dashboard components render', () => {
        it('Dashboard', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Dashboard/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        it('Dashboard Main', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Main/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        describe('Dashboard Main components render', () => {
            it('Carousel', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Carousel/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Logins', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Logins/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Spinner', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Spinner/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('TopType', () => {
                const div = document.createElement('div');
                ReactDOM.render(<TopType/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
    });

    describe('Shared components render', () => {
        it('Shared Sidebar', () => {
            const div = document.createElement('div');
            ReactDOM.render(<SharedSidebar/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        describe('Shared Sidebar components render', () => {
            it('Profile', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Profile/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Navbar', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Navbar/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
    });

    describe('Rooms components render', () => {
        it('Rooms', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Rooms/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        describe('Rooms components render', () => {
            it('RoomContainer', () => {
                const div = document.createElement('div');
                ReactDOM.render(<RoomContainer/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Room', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Room/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });
    });

    it('Join renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Join/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Loading renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Loading/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe('Login components render', () => {
        it('Login renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Login/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });
        describe('Login components render', () => {

            it('BarItem renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<BarItem/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('CookieMessage renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<CookieMessage/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Header renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Header/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('LoginButton renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<LoginButton/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('LoginButtonSecondary renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<LoginButtonSecondary/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('LoginCode renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<LoginCode/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('LoginFooter renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<LoginFooter/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('NavItem renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<NavItem/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('Reason renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<Reason/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
            it('SocialIcon renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(<SocialIcon/>, div);
                ReactDOM.unmountComponentAtNode(div);
            });
        });

    });

    it('NotFound renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NotFound/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Policies renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Policies/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Usage renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Usage/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
