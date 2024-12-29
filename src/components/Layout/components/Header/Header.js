import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { SearchIcon } from '~/components/Icons';
import Image from '~/components/Image';
import { userMenu, MENU_TAB_LOTRINHHOC, MENU_TAB_KIEMTRA, MENU_TAB_NGUPHAP, MENU_TAB_TAILIEU } from './HeaderConfig';
import Login from '~/pages/Login';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const [showLogin, setshowLogin] = useState(false);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    function toggleLoginPop() {
        setshowLogin(!showLogin);
    }

    // Handle logic
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
                <img src={images.logo} alt="English" />

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <button className={cx('more-btn')}>
                                <a className={cx('menu-tab')} href={MENU_TAB_LOTRINHHOC.url}>
                                    {MENU_TAB_LOTRINHHOC.title}
                                </a>
                            </button>

                            <Menu items={MENU_TAB_NGUPHAP.menu} className={cx('more-btn')}>
                                <button className={cx('more-btn')}>
                                    <a className={cx('menu-tab')} href={MENU_TAB_NGUPHAP.url}>
                                        {MENU_TAB_NGUPHAP.title}
                                    </a>
                                </button>
                            </Menu>
                            <Menu items={MENU_TAB_TAILIEU.menu} className={cx('more-btn')}>
                                <button className={cx('more-btn')}>
                                    <a className={cx('menu-tab')} href={MENU_TAB_TAILIEU.url}>
                                        {MENU_TAB_TAILIEU.title}
                                    </a>
                                </button>
                            </Menu>
                            <button className={cx('more-btn')}>
                                <a className={cx('menu-tab')} href={MENU_TAB_KIEMTRA.url}>
                                    {MENU_TAB_KIEMTRA.title}
                                </a>
                            </button>
                            <Menu items={userMenu} onChange={handleMenuChange}>
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                    alt="Nguyen Van A"
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={toggleLoginPop}>
                                Đăng nhập
                            </Button>
                            {showLogin ? <Login toggle={toggleLoginPop} /> : null}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
