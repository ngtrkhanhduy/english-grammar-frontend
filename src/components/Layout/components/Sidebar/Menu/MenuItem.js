import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, items, isCompleted }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Kiểm tra nếu bất kỳ mục con nào đang hoạt động
    const isActive = location.pathname === to || items?.some((item) => location.pathname === item.to);

    // Auto open menu if an item is active
    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [location.pathname, items, isActive]);

    return (
        <div className={cx('menu-item-container')}>
            <div
                className={cx('menu-item', { active: isActive })}
                onClick={items.length ? () => setIsOpen(!isOpen) : undefined}
            >
                <NavLink className={cx('link')} to={to}>
                    <span className={cx('title')}>{title}</span>
                </NavLink>
                <span className={cx('status-icon')}>{isCompleted ? '✔️' : '⭕'}</span>
                {items.length > 0 && <span className={cx('arrow', { open: isOpen })}>▼</span>}
            </div>
            {items.length > 0 && isOpen && (
                <div className={cx('submenu')}>
                    {items.map((item, index) => (
                        <NavLink
                            key={index}
                            className={cx('submenu-item', {
                                active: location.pathname === item.to,
                            })}
                            to={item.to}
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
        }),
    ),
    isCompleted: PropTypes.bool,
};

MenuItem.defaultProps = {
    items: [],
    isCompleted: false,
};

export default MenuItem;
