import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';

const cx = classNames.bind(styles);

function Sidebar({ children }) {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {Array.isArray(children) &&
                    children.map((item, index) => (
                        <MenuItem
                            key={index}
                            title={item.title}
                            to={item.to}
                            subItems={item.subItems} // Ensure correct prop name
                        />
                    ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
