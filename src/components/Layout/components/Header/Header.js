import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Cookies from 'js-cookie';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { userMenu, MENU_TAB_HOME, MENU_TAB_KIEMTRA, MENU_TAB_NGUPHAP } from './HeaderConfig';
import Login from '~/pages/Login';

const cx = classNames.bind(styles);

function Header() {
    const [, setSearchResult] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Initialize currentUser from Cookies
        const username = Cookies.get('username');
        setCurrentUser(username ? { username } : null);
    }, []);

    useEffect(() => {
        // Clear search results when component renders
        const timer = setTimeout(() => {
            setSearchResult([]);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    function toggleLoginPop() {
        setShowLogin(!showLogin);
    }

    const handleLoginSuccess = () => {
        // Update currentUser after successful login
        const username = Cookies.get('username');
        setCurrentUser(username ? { username } : null);
        setShowLogin(false); // Close login popup
    };

    // Handle menu logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <a href="/">
                    <img src={images.logo} alt="English" />
                </a>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <span>
                                {' '}
                                <strong> Welcome, {currentUser.username} </strong>
                            </span>
                            <button className={cx('more-btn')}>
                                <a className={cx('menu-tab')} href={MENU_TAB_HOME.url}>
                                    {MENU_TAB_HOME.title}
                                </a>
                            </button>

                            <button className={cx('more-btn')}>
                                <a className={cx('menu-tab')} href={MENU_TAB_NGUPHAP.url}>
                                    {MENU_TAB_NGUPHAP.title}
                                </a>
                            </button>

                            <button className={cx('more-btn')}>
                                <a className={cx('menu-tab')} href={MENU_TAB_KIEMTRA.url}>
                                    {MENU_TAB_KIEMTRA.title}
                                </a>
                            </button>
                            <Menu items={userMenu} onChange={handleMenuChange}>
                                <Image className={cx('user-avatar')} src={images.UserImage} alt="User image" />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={toggleLoginPop}>
                                Đăng nhập
                            </Button>
                            <Button primary onClick={toggleLoginPop}>
                                Đăng ký
                            </Button>
                            {showLogin && <Login toggle={toggleLoginPop} onLoginSuccess={handleLoginSuccess} />}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
