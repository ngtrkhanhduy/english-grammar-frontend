import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PresentPerfectContinuous = () => {
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
                rule: 'S + HAVE/HAS + BEEN + V-ing + O',
                examples: [
                    'She has been reading for an hour.',
                    'They have been playing football all afternoon.',
                    'I have been studying English since morning.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + HAVE/HAS + NOT + BEEN + V-ing + O',
                examples: [
                    'He has not been sleeping.',
                    'We have not been watching TV for long.',
                    'I have not been working this week.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'HAVE/HAS + S + BEEN + V-ing + O?',
                examples: ['Has she been reading?', 'Have they been playing football?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'She _____ (read) for two hours now.',
            options: ['has read', 'has been reading'],
            correctAnswer: 'has been reading',
        },
        {
            id: 2,
            type: 'single',
            question: 'They _____ (not play) football for a long time.',
            options: ["haven't been playing", "hasn't been playing"],
            correctAnswer: "haven't been playing",
        },
        {
            id: 3,
            type: 'single',
            question: '_____ you _____ (study) English for a long time?',
            options: ['Do / study', 'Have / been studying'],
            correctAnswer: 'Have / been studying',
        },
        {
            id: 4,
            type: 'fill',
            question: 'He _____ (work) here for five years.',
            correctAnswer: 'has been working',
        },
        {
            id: 5,
            type: 'fill',
            question: 'I _____ (not sleep) for 24 hours.',
            correctAnswer: "haven't been sleeping",
        },
        {
            id: 6,
            type: 'fill',
            question: '_____ they _____ (play) football for two hours?',
            correctAnswer: 'Have they been playing',
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
        const path = 'present-perfect-continuous';
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
            <h1>Hiện tại hoàn thành tiếp diễn</h1>
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
                            <h3>Tổng quan về thì hiện tại hoàn thành tiếp diễn</h3>
                            <p>
                                Thì hiện tại hoàn thành tiếp diễn (Present Perfect Continuous) dùng để diễn tả hành động
                                vừa mới xảy ra, hành động đã xảy ra và kéo dài đến hiện tại, hoặc hành động xảy ra trong
                                một khoảng thời gian không xác định trước đó.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + HAVE/HAS + BEEN + V-ing + O (Khẳng định)</p>
                            <p>S + HAVE/HAS + NOT + BEEN + V-ing + O (Phủ định)</p>
                            <p>HAVE/HAS + S + BEEN + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I have been working for three hours. (Tôi đã làm việc ba giờ.)
                                <br />
                                - She hasn't been sleeping. (Cô ấy không ngủ.)
                                <br />- Have they been playing football for a long time? (Họ có chơi bóng đá lâu rồi
                                không?)
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

export default PresentPerfectContinuous;
