import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Exercises.module.scss';

const cx = classNames.bind(styles);

const tests = [
    {
        id: 1,
        title: 'New Economy TOEIC Test 1',
        time: '120 phút',
        participants: '1285041',
        comments: 1654,
        questions: 200,
        tag: '#TOEIC',
        resultAvailable: true,
        path: '/toiec-exercises-001', // Add path for navigation
    },
    {
        id: 2,
        title: 'New Economy TOEIC Test 10',
        time: '120 phút',
        participants: '340011',
        comments: 206,
        questions: 200,
        tag: '#TOEIC',
        resultAvailable: false,
        path: '/toiec-exercises-010', // Add path for navigation
    },
    // Add more test data as needed
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
                    <p className={cx('test-info')}>
                        <span>🕒 {test.time}</span> | <span>👤 {test.participants}</span> |{' '}
                    </p>
                    <p className={cx('test-questions')}>{test.questions} câu hỏi</p>
                    <span className={cx('test-tag')}>{test.tag}</span>
                    {test.resultAvailable ? (
                        <button className={cx('result-button')}>Xem kết quả</button>
                    ) : (
                        <button className={cx('detail-button')}>Chi tiết</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Exercises;
