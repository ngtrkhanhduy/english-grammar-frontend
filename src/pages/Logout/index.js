import { useEffect } from 'react';
import Cookies from 'js-cookie';

function Logout() {
    useEffect(() => {
        // Remove all authentication cookies
        Cookies.remove('username');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');

        // Redirect to homepage
        window.location.href = '/';
    }, []); // Runs only once when the component is mounted

    return <h2>Logging out...</h2>;
}

export default Logout;
