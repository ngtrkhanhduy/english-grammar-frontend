import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './HeaderOnlyLayout.module.scss';

const cx = classNames.bind(styles);

function HeaderOnlyLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;
