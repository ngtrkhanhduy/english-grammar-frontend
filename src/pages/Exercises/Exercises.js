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
        path: '/toiec-exercises-001',
    },
    {
        id: 2,
        title: 'New Economy TOEIC Test 3',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/toiec-exercises-001',
    },
    {
        id: 2,
        title: 'New Economy TOEIC Test 4',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/toiec-exercises-001',
    },
    {
        id: 2,
        title: 'New Economy TOEIC Test 4',
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/toiec-exercises-001',
    },
];

const Exercises = () => {
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
                        <button
                            onClick={() => (window.location.href = '/toiec-exercises-001')}
                            className={cx('result-button')}
                        >
                            Xem kết quả
                        </button>
                    ) : (
                        <button
                            onClick={() => (window.location.href = '/toiec-exercises-001/practice')}
                            className={cx('detail-button')}
                        >
                            Chi tiết
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Exercises;
