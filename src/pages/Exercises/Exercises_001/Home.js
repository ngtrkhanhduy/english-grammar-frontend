import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';
import { get } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

const ExercisesPage = () => {
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        // Use the 'get' method from axios to fetch data
        get('/user-exercises-process/ngtrkhanhduy1308@gmail.com')
            .then((data) => {
                // Format the data as needed
                const formattedResults = data.map((test) => ({
                    id: test._id,
                    date: new Date(test.createdAt).toLocaleDateString('vi-VN'),
                    result: `${test.result}/${test.count}`,
                }));
                setTestResults(formattedResults);
            })
            .catch((error) => console.error('Error fetching test results:', error));
    }, []);

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
                                    <td>
                                        <a href={`/toiec-exercises-001/${test.id}`}>Xem chi tiết</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={() => (window.location.href = '/toiec-exercises-001/practice')}>Làm bài</button>
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;
