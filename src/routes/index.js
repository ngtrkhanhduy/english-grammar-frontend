// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
];

const privateRoutes = [{ path: '/Login', component: Login }];

export { publicRoutes, privateRoutes };
