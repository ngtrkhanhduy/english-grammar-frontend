import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const FuturePerfectContinuous = () => {
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
                rule: 'S + WILL HAVE BEEN + V-ing + O',
                examples: [
                    'I will have been working for 5 hours by the time you arrive.',
                    'By next year, she will have been living here for 10 years.',
                    'They will have been studying for three hours by noon.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: "S + WILL NOT (WON'T) HAVE BEEN + V-ing + O",
                examples: [
                    'I will not have been working for long by the time you arrive.',
                    'She will not have been living here for 10 years by next year.',
                    'They won’t have been studying for 3 hours by the time we meet.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'WILL + S + HAVE BEEN + V-ing + O?',
                examples: [
                    'Will you have been working for 5 hours by the time I arrive?',
                    'Will they have been studying for 3 hours by noon?',
                ],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'By the time you arrive, I _____ (work) for 5 hours.',
            options: ['will work', 'will have been working'],
            correctAnswer: 'will have been working',
        },
        {
            id: 2,
            type: 'single',
            question: 'By next year, they _____ (not live) in this city for 10 years.',
            options: ['won’t have lived', 'won’t have been living'],
            correctAnswer: 'won’t have been living',
        },
        {
            id: 3,
            type: 'single',
            question: '_____ you _____ (study) for 5 hours by the time I call?',
            options: ['Will / study', 'Will / have been studying'],
            correctAnswer: 'Will / have been studying',
        },
        {
            id: 4,
            type: 'fill',
            question: 'By 8 PM, we _____ (wait) for two hours.',
            correctAnswer: 'will have been waiting',
        },
        {
            id: 5,
            type: 'fill',
            question: 'Next month, she _____ (work) at the company for 5 years.',
            correctAnswer: 'will have been working',
        },
        {
            id: 6,
            type: 'fill',
            question: 'By next week, they _____ (study) for 10 hours straight.',
            correctAnswer: 'will have been studying',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'future-perfect-continuous';
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
            <h1>Tương lai hoàn thành tiếp diễn</h1>
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
                            <h3>Tổng quan về thì tương lai hoàn thành tiếp diễn</h3>
                            <p>
                                Thì tương lai hoàn thành tiếp diễn (Future Perfect Continuous) diễn tả hành động sẽ kéo
                                dài cho đến một thời điểm trong tương lai. Nó cũng được sử dụng để chỉ sự tiếp diễn của
                                hành động cho đến khi một mốc thời gian nào đó trong tương lai.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + WILL HAVE BEEN + V-ing + O (Khẳng định)</p>
                            <p>S + WILL NOT (WON'T) HAVE BEEN + V-ing + O (Phủ định)</p>
                            <p>WILL + S + HAVE BEEN + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - By the time you arrive, I will have been working for 5 hours.
                                <br />
                                - They won’t have been living in the city for 10 years by next year.
                                <br />- Will you have been studying for 5 hours by the time I call?
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

export default FuturePerfectContinuous;
