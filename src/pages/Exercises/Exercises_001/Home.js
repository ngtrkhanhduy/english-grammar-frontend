import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';

const cx = classNames.bind(styles);

const testResults = [
    {
        date: '12/01/2025',
        result: '5/30',
        url: '',
    },
    {
        date: '05/01/2025',
        result: '6/30',
        url: '',
    },
];

const ExercisesPage = () => {
    return (
        <div className={cx('english-grammar')}>
            <div className={cx('exercises')}>
                <h1>New Economy TOEIC Test 1</h1>
                <div>
                    <h3>Kết quả làm bài của bạn:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Ngày làm</th>
                                <th>Kết quả</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResults.map((test, index) => (
                                <tr key={index}>
                                    <td>{test.date}</td>
                                    <td>{test.result}</td>
                                    <td>Xem chi tiết</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;
