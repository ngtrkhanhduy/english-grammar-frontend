import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        // Code to handle login goes here
        props.toggle();
    }

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
                    <Button primary>Log in</Button>
                </form>
                <Button onClick={props.toggle}>Close</Button>
            </div>
        </div>
    );
}

export default Login;
