import React from 'react';
import styles from './CommingSoon.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CommitSoon = () => {
    const handleBackToHome = () => {
        window.location.href = '/';
    };

    return (
        <div className={cx('commit-soon-container')}>
            <h1 className={cx('commit-soon-header')}>Commit Soon!</h1>
            <p className={cx('commit-soon-message')}>We're working on something exciting. Stay tuned for updates!</p>
            <div className={cx('commit-soon-button-container')}>
                <button className={cx('commit-soon-button')} onClick={handleBackToHome}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default CommitSoon;
