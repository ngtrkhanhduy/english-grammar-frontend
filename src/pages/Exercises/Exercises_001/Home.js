import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';
import { get } from '~/utils/httpRequest';
import Cookies from 'js-cookie';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const ExercisesPage = () => {
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        // Fetch data using the 'get' method
        const username = Cookies.get('username');
        get(`/user-exercises-process/${username}`)
            .then((data) => {
                // Format the data and reverse the order
                const formattedResults = data.map((test) => ({
                    id: test._id,
                    date: new Date(test.createdAt).toLocaleDateString('vi-VN'),
                    result: `${test.result}/${test.count}`,
                }));

                // Reverse the results to show the latest test at the top
                setTestResults(formattedResults.reverse());
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
                                <tr
                                    key={index}
                                    className={index === 0 ? cx('highlight') : ''} // Highlight the first row (most recent)
                                >
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
                    <Button primary onClick={() => (window.location.href = '/toiec-exercises-001/practice')}>
                        Làm bài
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;
