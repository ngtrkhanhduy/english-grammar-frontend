import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Exercises.module.scss';

const cx = classNames.bind(styles);

const tests = [
    {
        id: 1,
        title: 'New Economy TOEIC Test 1',
        tag: '#TOEIC',
        resultAvailable: true,
        path: '/toiec-exercises-001',
    },
    {
        id: 2,
        title: 'New Economy TOEIC Test 2',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/comming-soon',
    },
    {
        id: 3,
        title: 'New Economy TOEIC Test 3',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/comming-soon',
    },
    {
        id: 4,
        title: 'New Economy TOEIC Test 4',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/comming-soon',
    },
    {
        id: 5,
        title: 'New Economy TOEIC Test 5',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/comming-soon',
    },
];

const Exercises = () => {
    const handleButtonClick = (path) => {
        if (path === '/comming-soon') {
            window.location.href = path;
        } else {
            window.location.href = `${path}/practice`;
        }
    };

    return (
        <div className={cx('test-list-container')}>
            {tests.map((test) => (
                <div key={test.id} className={cx('test-card')}>
                    <h3 className={cx('test-title')}>
                        <Link to={test.path} className={cx('title-link')}>
                            {test.title}
                        </Link>
                    </h3>
                    <span className={cx('test-tag')}>{test.tag}</span>
                    {test.resultAvailable ? (
                        <button onClick={() => (window.location.href = `${test.path}`)} className={cx('result-button')}>
                            Xem kết quả
                        </button>
                    ) : (
                        <button onClick={() => handleButtonClick(test.path)} className={cx('detail-button')}>
                            Chi tiết
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Exercises;
