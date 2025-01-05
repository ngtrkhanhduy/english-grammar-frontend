import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Call API backend
            const response = await axios.post('http://localhost:8081/auth/signin', {
                username,
                password,
            });

            // Handle successful response
            if (response.data) {
                const { username, accessToken, refreshToken } = response.data;

                // Save data into cookies
                Cookies.set('username', username, { expires: 7, secure: true, sameSite: 'strict' });
                Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                window.location.href = '/';
            } else {
                alert(response.data.message || 'Login failed!');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('popup')}>
            <div className={cx('popup-inner')}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={cx('input')}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cx('input')}
                        />
                    </label>
                    <Button primary disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <Button onClick={props.toggle}>Close</Button>
            </div>
        </div>
    );
}

export default Login;
