import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

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
    const [isActivationPopupVisible, setIsActivationPopupVisible] = useState(false); // New state to control the popup
    const [successMessage, setSuccessMessage] = useState(''); // Success message after activation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // Clear any previous error messages

        if (!isLogin && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)) {
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

            const data = isLogin ? { username, password } : { name, username, password };

            const response = await axios.post(url, data);

            if (response.data) {
                if (isLogin) {
                    const { username, accessToken, refreshToken } = response.data;

                    Cookies.set('username', username, { expires: 7, secure: true, sameSite: 'strict' });
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                    window.location.href = '/';
                } else {
                    setErrorMessage('Registration successful! Please enter your activation key.');
                    setIsActivationPopupVisible(true); // Show the activation key popup
                }
            } else {
                setErrorMessage(response.data.message || (isLogin ? 'Login failed!' : 'Registration failed!'));
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

    const handleActivationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // Clear any previous error messages

        try {
            const response = await axios.post('http://localhost:8081/auth/active', {
                username,
                activeAccountKey,
            });

            console.log(response);

            if (response.data.success) {
                setIsActivationPopupVisible(false); // Close the activation popup
                setIsLogin(true); // Switch to login form after successful activation
                setErrorMessage('Account activated successfully! You will be logged in now.'); // Clear any error messages

                // After activation, automatically sign in
                const loginResponse = await axios.post('http://localhost:8081/auth/signin', {
                    username,
                    password, // Use the same password provided during registration
                });

                if (loginResponse.data) {
                    const { username, accessToken, refreshToken } = loginResponse.data;

                    Cookies.set('username', username, { expires: 7, secure: true, sameSite: 'strict' });
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

                    // Redirect to the homepage after login
                    window.location.href = '/profile';
                } else {
                    setErrorMessage(loginResponse.data.message || 'Login failed after activation.');
                }
            } else {
                setErrorMessage(response.data.message || 'Invalid activation key. Please try again.');
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
                {/* Only show activation popup after registration */}
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
                    // Show login/register form if the user is not at the activation step
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
                                    setSuccessMessage(''); // Clear success message on switching to login
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
                                    setSuccessMessage(''); // Clear success message on switching to register
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
