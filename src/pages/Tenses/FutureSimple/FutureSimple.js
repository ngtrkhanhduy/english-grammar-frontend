import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const FutureSimple = () => {
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
                rule: 'S + WILL + V (base form) + O',
                examples: ['I will call you later.', 'They will arrive at 5 PM.', 'We will go to the beach tomorrow.'],
            },
        ],
        'Phủ định': [
            {
                rule: "S + WILL NOT (WON'T) + V (base form) + O",
                examples: [
                    "I will not (won't) eat pizza tonight.",
                    "She will not (won't) come to the party.",
                    "They will not (won't) study for the test.",
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'WILL + S + V (base form) + O?',
                examples: ['Will you come to the party?', 'Will they play football tomorrow?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. I _____ (call) you when I arrive.',
            options: ['will call', 'call'],
            correctAnswer: 'will call',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (not come) to the party tomorrow.',
            options: ["won't come", "don't come"],
            correctAnswer: "won't come",
        },
        {
            id: 3,
            type: 'single',
            question: '3. _____ she _____ (finish) her project by next week?',
            options: ['Will / finish', 'Does / finish'],
            correctAnswer: 'Will / finish',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. We _____ (meet) at the café at 5 PM.',
            correctAnswer: 'will meet',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. He _____ (not go) to the office tomorrow.',
            correctAnswer: 'won’t go',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. I _____ (help) you with your homework.',
            correctAnswer: 'will help',
        },
        {
            id: 7,
            type: 'single',
            question: '7. They _____ (travel) to Spain next summer.',
            options: ['will travel', 'travel'],
            correctAnswer: 'will travel',
        },
        {
            id: 8,
            type: 'single',
            question: '8. She _____ (not attend) the meeting tomorrow.',
            options: ["won't attend", "doesn't attend"],
            correctAnswer: "won't attend",
        },
        {
            id: 9,
            type: 'fill',
            question: '9. I _____ (study) for my exams next week.',
            correctAnswer: 'will study',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ you _____ (go) to the concert with me?',
            correctAnswer: 'Will you go',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'future-simple';
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
            <h1>Tương lai đơn</h1>
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
                            <h3>Tổng quan về thì tương lai đơn</h3>
                            <p>
                                Thì tương lai đơn (Future Simple) dùng để diễn tả hành động sẽ xảy ra trong tương lai.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + WILL + V (base form) + O (Khẳng định)</p>
                            <p>S + WILL NOT (WON'T) + V (base form) + O (Phủ định)</p>
                            <p>WILL + S + V (base form) + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I will call you later.
                                <br />
                                - They will not arrive until 8 PM.
                                <br />- Will you help us with the project?
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

export default FutureSimple;
