import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, subItems }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Hook to get the current URL
    const [activeSubItem, setActiveSubItem] = useState(null);

    // Toggle submenu open/close
    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle subitem click
    const handleSubItemClick = (subItem) => {
        setActiveSubItem(subItem.title);
    };

    return (
        <div className={cx('menu-item-container')}>
            <div className={cx('menu-item', { active: activeSubItem })} onClick={subItems ? toggleSubMenu : undefined}>
                <NavLink className={(nav) => cx('link')} to={to}>
                    <span className={cx('title')}>{title}</span>
                </NavLink>

                {subItems && <span className={cx('arrow', { open: isOpen })}>▼</span>}
            </div>
            {subItems && isOpen && (
                <div className={cx('submenu')}>
                    {subItems.map((subItem, index) => (
                        <div
                            key={index}
                            className={cx('submenu-item', {
                                active: location.pathname === subItem.to,
                            })}
                            onClick={() => handleSubItemClick(subItem)}
                        >
                            <span className={cx('status-icon')}>{subItem.completed ? '🟢' : '⭕'}</span>
                            <NavLink className={cx('submenu-item-link')} to={subItem.to}>
                                {subItem.title}
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            completed: PropTypes.bool,
        }),
    ),
};

MenuItem.defaultProps = {
    subItems: [],
};

export default MenuItem;
