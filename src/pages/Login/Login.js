import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Auth({ toggle }) {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!isLogin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('Invalid email format.');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            const url = isLogin ? 'http://localhost:8081/auth/signin' : 'http://localhost:8081/auth/signup';

            const data = isLogin ? { username, password } : { username, password, email };

            const response = await axios.post(url, data);

            if (response.data) {
                if (isLogin) {
                    const { username, accessToken, refreshToken } = response.data;

                    Cookies.set('username', username, { expires: 7, secure: true, sameSite: 'strict' });
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                    window.location.href = '/';
                } else {
                    setErrorMessage('Registration successful! You can now log in.');
                    setIsLogin(true);
                }
            } else {
                setErrorMessage(response.data.message || (isLogin ? 'Login failed!' : 'Registration failed!'));
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('popup')}>
            <div className={cx('popup-inner')}>
                <div className={cx('tabs')}>
                    <button
                        className={cx({ active: isLogin })}
                        onClick={() => {
                            setIsLogin(true);
                            setErrorMessage(null);
                            setUsername(null);
                            setPassword(null);
                            setConfirmPassword(null);
                            setEmail(null);
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={cx({ active: !isLogin })}
                        onClick={() => {
                            setIsLogin(false);
                            setErrorMessage(null);
                            setUsername('');
                            setPassword('');
                            setConfirmPassword('');
                            setEmail('');
                        }}
                    >
                        Register
                    </button>
                </div>

                <h2 className={cx('title')}>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className={cx('form')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="username" className={cx('label')}>
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={cx('input')}
                            placeholder="Enter your username"
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className={cx('form-group')}>
                                <label htmlFor="email" className={cx('label')}>
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cx('input')}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor="confirm-password" className={cx('label')}>
                                    Confirm Password:
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={cx('input')}
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </>
                    )}

                    <div className={cx('form-group')}>
                        <label htmlFor="password" className={cx('label')}>
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={cx('input')}
                            placeholder="Enter your password"
                        />
                    </div>
                    {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}

                    <Button primary disabled={loading} className={cx('button')}>
                        {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
                    </Button>
                </form>
                <Button onClick={toggle} className={cx('close-button')}>
                    Close
                </Button>
            </div>
        </div>
    );
}

export default Auth;
