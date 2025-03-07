import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const FuturePerfect = () => {
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
                rule: 'S + WILL HAVE + V3 (past participle) + O',
                examples: [
                    'I will have finished the project by next week.',
                    'She will have graduated by the time we arrive.',
                    'They will have completed the task by 5 PM.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: "S + WILL NOT (WON'T) HAVE + V3 (past participle) + O",
                examples: [
                    'I will not have finished by tomorrow.',
                    'They will not have arrived by 8 PM.',
                    "We won't have completed the work by the deadline.",
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'WILL + S + HAVE + V3 (past participle) + O?',
                examples: ['Will you have completed the assignment by then?', 'Will she have left before we arrive?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. By next year, I _____ (finish) the project.',
            options: ['will have finished', 'will finish'],
            correctAnswer: 'will have finished',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (complete) the task by tomorrow.',
            options: ['will have completed', 'will complete'],
            correctAnswer: 'will have completed',
        },
        {
            id: 3,
            type: 'single',
            question: '3. By the time you arrive, I _____ (leave).',
            options: ['will have left', 'will leave'],
            correctAnswer: 'will have left',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. By the end of this year, we _____ (build) the new school.',
            correctAnswer: 'will have built',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. He _____ (write) three books by the time he turns 40.',
            correctAnswer: 'will have written',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. By next month, I _____ (save) enough money to buy a car.',
            correctAnswer: 'will have saved',
        },
        {
            id: 7,
            type: 'single',
            question: '7. They _____ (arrive) by the time the show starts.',
            options: ['will have arrived', 'will arrive'],
            correctAnswer: 'will have arrived',
        },
        {
            id: 8,
            type: 'single',
            question: '8. She _____ (finish) her homework by 6 PM.',
            options: ['will have finished', 'will finish'],
            correctAnswer: 'will have finished',
        },
        {
            id: 9,
            type: 'fill',
            question: '9. By next week, I _____ (study) for my exams for two weeks.',
            correctAnswer: 'will have studied',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. By 2025, we _____ (develop) a new technology.',
            correctAnswer: 'will have developed',
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
        const path = 'future-perfect';
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
            <h1>Tương lai hoàn thành</h1>
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
                            <h3>Tổng quan về thì tương lai hoàn thành</h3>
                            <p>
                                Thì tương lai hoàn thành (Future Perfect) dùng để diễn tả một hành động sẽ hoàn thành
                                trước một thời điểm xác định trong tương lai.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + WILL HAVE + V3 (past participle) + O (Khẳng định)</p>
                            <p>S + WILL NOT (WON'T) HAVE + V3 (past participle) + O (Phủ định)</p>
                            <p>WILL + S + HAVE + V3 (past participle) + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I will have finished the work by tomorrow.
                                <br />
                                - They will not have completed the project by next year.
                                <br />- Will you have completed the task by 5 PM?
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

export default FuturePerfect;
