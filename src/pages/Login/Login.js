import { useState } from 'react';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

// Import the custom post function
import { post } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Auth({ toggle }) {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeAccountKey, setActiveAccountKey] = useState('');
    const [isActivationPopupVisible, setIsActivationPopupVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Validate email for Register
        if (!isLogin && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)) {
            setErrorMessage('Invalid email format.');
            setLoading(false);
            return;
        }

        // Validate password length
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        // Check confirm password for Register
        if (!isLogin && password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
            // Choose endpoint based on login or register
            const url = isLogin ? '/auth/signin' : '/auth/signup';
            const data = isLogin ? { username, password } : { name, username, password };

            // Call the custom POST method
            const result = await post(url, data);

            if (result) {
                // If logging in
                if (isLogin) {
                    const { username: user, accessToken, refreshToken } = result;

                    // Save tokens in cookies
                    Cookies.set('username', user, { expires: 7, secure: true, sameSite: 'strict' });
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                    // Redirect
                    window.location.href = '/';
                } else {
                    // Registration successful, show activation popup
                    setErrorMessage('Registration successful! Please check your email and enter your activation key.');
                    setIsActivationPopupVisible(true);
                }
            } else {
                // If result is somehow falsy
                setErrorMessage(isLogin ? 'Login failed!' : 'Registration failed!');
            }
        } catch (err) {
            console.error(err);
            // Attempt to read error message from server response
            setErrorMessage(
                err.response?.data?.message || 'An error occurred while processing your request. Please try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleActivationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            // Activate the account
            const activationResult = await post('/auth/active', {
                username,
                activeAccountKey,
            });

            if (activationResult?.success) {
                setIsActivationPopupVisible(false);
                setIsLogin(true);
                setErrorMessage('Account activated successfully! You will be logged in now.');

                // After activation, automatically sign in
                const loginResult = await post('/auth/signin', {
                    username,
                    password,
                });

                if (loginResult) {
                    const { username: user, accessToken, refreshToken } = loginResult;

                    Cookies.set('username', user, { expires: 7, secure: true, sameSite: 'strict' });
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                    // Redirect after login
                    window.location.href = '/profile';
                } else {
                    setErrorMessage('Login failed after activation.');
                }
            } else {
                setErrorMessage(activationResult?.message || 'Invalid activation key. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(
                err.response?.data?.message || 'An error occurred while activating your account. Please try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('popup')}>
            <div className={cx('popup-inner')}>
                {/* Activation Popup */}
                {isActivationPopupVisible ? (
                    <>
                        <h2 className={cx('title')}>Activate Your Account</h2>
                        <form onSubmit={handleActivationSubmit} className={cx('form')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="activeAccountKey" className={cx('label')}>
                                    Activation Key:
                                </label>
                                <input
                                    id="activeAccountKey"
                                    type="text"
                                    value={activeAccountKey}
                                    onChange={(e) => setActiveAccountKey(e.target.value)}
                                    className={cx('input')}
                                    placeholder="Enter your activation key"
                                />
                            </div>
                            {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
                            {successMessage && <p className={cx('success-message')}>{successMessage}</p>}
                            <Button primary disabled={loading} className={cx('button')}>
                                {loading ? 'Activating...' : 'Activate'}
                            </Button>
                        </form>
                        <Button onClick={() => setIsActivationPopupVisible(false)} className={cx('close-button')}>
                            Close
                        </Button>
                    </>
                ) : (
                    // Login / Register Form
                    <>
                        <div className={cx('tabs')}>
                            <button
                                className={cx({ active: isLogin })}
                                onClick={() => {
                                    setIsLogin(true);
                                    setErrorMessage(null);
                                    setUsername('');
                                    setPassword('');
                                    setConfirmPassword('');
                                    setName('');
                                    setSuccessMessage('');
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
                                    setName('');
                                    setSuccessMessage('');
                                }}
                            >
                                Register
                            </button>
                        </div>

                        <h2 className={cx('title')}>{isLogin ? 'Login' : 'Register'}</h2>
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <div className={cx('form-group')}>
                                <label htmlFor="username" className={cx('label')}>
                                    Email:
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={cx('input')}
                                    placeholder="Enter your email"
                                />
                            </div>

                            {!isLogin && (
                                <>
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
                            {successMessage && <p className={cx('success-message')}>{successMessage}</p>}

                            <Button primary disabled={loading} className={cx('button')}>
                                {loading
                                    ? isLogin
                                        ? 'Logging in...'
                                        : 'Registering...'
                                    : isLogin
                                    ? 'Login'
                                    : 'Register'}
                            </Button>
                        </form>
                        <Button onClick={toggle} className={cx('close-button')}>
                            Close
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth;
