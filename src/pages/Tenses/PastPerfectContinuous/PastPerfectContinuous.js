import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PastPerfectContinuous = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Khẳng định', 'Phủ định', 'Nghi vấn', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Khẳng định': [
            {
                rule: 'S + HAD BEEN + V-ing + O',
                examples: [
                    'She had been working all day when I called her.',
                    'They had been studying for hours before the exam.',
                    'I had been waiting for 30 minutes when the bus arrived.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + HAD NOT BEEN + V-ing + O',
                examples: [
                    'He had not been sleeping when I entered the room.',
                    'We had not been working on the project when the meeting started.',
                    'I had not been studying before the test.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'HAD + S + BEEN + V-ing + O?',
                examples: [
                    'Had she been working before you arrived?',
                    'Had they been playing football when it started raining?',
                ],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. He _____ (study) for two hours when I called him.',
            options: ['had been studying', 'was studying'],
            correctAnswer: 'had been studying',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (wait) for the bus for 30 minutes when it started to rain.',
            options: ['had been waiting', 'waited'],
            correctAnswer: 'had been waiting',
        },
        {
            id: 3,
            type: 'single',
            question: '3. I _____ (work) for the company for 5 years when I decided to quit.',
            options: ['had been working', 'worked'],
            correctAnswer: 'had been working',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. She _____ (look) for her keys for hours before she found them.',
            correctAnswer: 'had been looking',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. We _____ (play) soccer for an hour when it started to rain.',
            correctAnswer: 'had been playing',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. By the time they arrived, I _____ (finish) my homework.',
            correctAnswer: 'had been finishing',
        },
        {
            id: 7,
            type: 'single',
            question: '7. He _____ (not sleep) for two days when he finally went to bed.',
            options: ['had not been sleeping', "hadn't sleep"],
            correctAnswer: 'had not been sleeping',
        },
        {
            id: 8,
            type: 'single',
            question: '8. They _____ (work) on the project all day before they submitted it.',
            options: ['had been working', 'worked'],
            correctAnswer: 'had been working',
        },
        {
            id: 9,
            type: 'fill',
            question: '9. She _____ (run) for 20 minutes when she hurt her leg.',
            correctAnswer: 'had been running',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ you _____ (wait) long when I called?',
            correctAnswer: 'Had you been waiting',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map(
            (q) => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim(),
        );
        const username = Cookies.get('username');
        const path = 'past-perfect-continuous';
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
            <h1>Quá khứ hoàn thành tiếp diễn</h1>
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
                            <h3>Tổng quan về thì quá khứ hoàn thành tiếp diễn</h3>
                            <p>
                                Thì quá khứ hoàn thành tiếp diễn (Past Perfect Continuous) diễn tả hành động đang xảy ra
                                liên tục trong quá khứ trước một hành động hoặc thời điểm khác.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + HAD BEEN + V-ing + O (Khẳng định)</p>
                            <p>S + HAD NOT BEEN + V-ing + O (Phủ định)</p>
                            <p>HAD + S + BEEN + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I had been waiting for two hours when the train finally arrived.
                                <br />
                                - She had been studying all night before the exam.
                                <br />- Had they been working on the project when the deadline passed?
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

export default PastPerfectContinuous;
