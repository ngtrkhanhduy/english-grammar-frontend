import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '.././Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PresentSimpleExercise = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // New state for showing the popup

    const tabs = ['Tổng quan', 'Khẳng định', 'Phủ định', 'Nghi vấn', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Khẳng định': [
            {
                rule: 'S + V(s/es) + O',
                examples: ['She is beautiful.', 'This book is very interesting.', 'She watches TV in the evening.'],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + DO/DOES + NOT + V (bare) + O',
                examples: ['He does not (doesn’t) play football.', 'She does not (doesn’t) watch TV.'],
            },
        ],
        'Nghi vấn': [
            { rule: 'DO/DOES + S + V (bare) + O?', examples: ['Does he play football?', 'Does she watch TV?'] },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'She _____ to school every day.',
            options: ['go', 'goes'],
            correctAnswer: 'goes',
        },
        {
            id: 2,
            type: 'single',
            question: 'He _____ football on Sundays. (negative)',
            options: ['does not play', 'do not play'],
            correctAnswer: 'does not play',
        },
        {
            id: 3,
            type: 'single',
            question: '_____ your father work on Sundays?',
            options: ['Do', 'Does'],
            correctAnswer: 'Does',
        },
        {
            id: 4,
            type: 'fill',
            question: 'They _____ (to live) in a big house.',
            correctAnswer: 'live',
        },
        {
            id: 5,
            type: 'fill',
            question: 'She _____ (not to watch) TV in the evening.',
            correctAnswer: 'does not watch',
        },
        {
            id: 6,
            type: 'fill',
            question: '_____ (he / to read) books every night before sleeping?',
            correctAnswer: 'Does he read',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'present-simple';
        setResults(evaluatedResults);

        // Check if all answers are correct
        if (evaluatedResults.every((result) => result === true)) {
            // If all answers are correct, update the user's learning process using PUT request
            try {
                const response = await put(`/user-learning-process/${username}/${path}`, {
                    completed: true,
                });
                console.log('User progress updated successfully:', response);

                // Show the success popup
                setShowPopup(true);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        }
    };

    const handleResetAll = () => {
        setAnswers({});
        setResults(null);
    };

    const handleReloadPage = () => {
        // Reload the current page after clicking "OK"
        window.location.reload();
    };

    return (
        <div>
            <h1>Hiện tại đơn</h1>
            <div className={cx('exercise-container')}>
                <div className={cx('tabs')}>
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={cx('tab', { active: tabIndex === index })}
                            onClick={() => setTabIndex(index)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={cx('content')}>
                    {tabIndex === 0 ? (
                        // "Tổng quan" tab content
                        <div>
                            <h3>Tổng quan về thì hiện tại đơn</h3>
                            <p>
                                Thì hiện tại đơn (Present Simple) dùng để diễn tả các hành động thường xuyên, thói quen,
                                sự thật hiển nhiên hoặc sự việc diễn ra ở hiện tại. Đây là một trong những thì cơ bản
                                nhất trong tiếng Anh.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + V(s/es) + O (Khẳng định)</p>
                            <p>S + DO/DOES + NOT + V (bare) + O (Phủ định)</p>
                            <p>DO/DOES + S + V (bare) + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I work every day. (Tôi làm việc mỗi ngày.)
                                <br />
                                - She doesn't like coffee. (Cô ấy không thích cà phê.)
                                <br />- Does he study at the library? (Anh ấy có học ở thư viện không?)
                            </p>
                        </div>
                    ) : tabIndex < 4 ? (
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {exercises[tabs[tabIndex]].map((item, i) => (
                                <div key={i} className={cx('rule-container')}>
                                    <p>
                                        <strong>Công thức:</strong>
                                    </p>
                                    <p className={cx('rule')}>
                                        <strong>{item.rule}</strong>
                                    </p>
                                    <p>
                                        <strong>Ví dụ:</strong>
                                    </p>
                                    {item.examples.map((ex, idx) => (
                                        <p key={idx}>{ex}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {questions.map((q, index) => (
                                <div key={q.id} className={cx('question')}>
                                    <p>{q.question}</p>
                                    {q.type === 'single' ? (
                                        <select
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        >
                                            <option value="">--Chọn đáp án--</option>
                                            {q.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={answers[q.id] || ''}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            disabled={results !== null}
                                        />
                                    )}
                                    {results && (
                                        <p className={cx(results[index] ? 'correct' : 'incorrect')}>
                                            {results[index] ? 'Correct!' : `Incorrect! Đáp án đúng: ${q.correctAnswer}`}
                                        </p>
                                    )}
                                </div>
                            ))}
                            <button
                                className={cx('check-button')}
                                onClick={handleCheckAnswers}
                                disabled={results !== null}
                            >
                                Check Answers
                            </button>
                            <button className={cx('reset-button')} onClick={handleResetAll}>
                                Làm lại tất cả
                            </button>
                        </div>
                    )}
                </div>

                <div className={cx('navigation')}>
                    <button className={cx('nav-space')} onClick={prevTab} disabled={tabIndex === 0}>
                        Previous
                    </button>
                    <button className={cx('nav-space')} onClick={nextTab} disabled={tabIndex === tabs.length - 1}>
                        Next
                    </button>
                </div>
            </div>

            {/* Popup for success */}
            {showPopup && (
                <div className={cx('popup-overlay')}>
                    <div className={cx('popup-content')}>
                        <h2>Chúc mừng! Bạn đã hoàn thành bài tập!</h2>
                        <button onClick={handleReloadPage}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresentSimpleExercise;
