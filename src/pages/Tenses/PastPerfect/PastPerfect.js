import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PastPerfect = () => {
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
                rule: 'S + HAD + V3 (Past Participle) + O',
                examples: [
                    'She had finished her homework before I arrived.',
                    'They had left by the time we reached the station.',
                    'I had already eaten when they called me.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + HAD + NOT + V3 (Past Participle) + O',
                examples: [
                    'He had not seen the movie before.',
                    'We had not finished our work when the manager arrived.',
                    'I had not heard about the event until yesterday.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'HAD + S + V3 (Past Participle) + O?',
                examples: ['Had she finished the project before the deadline?', 'Had they visited the museum?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. By the time I arrived, she _____ (leave).',
            options: ['had left', 'left'],
            correctAnswer: 'had left',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (not finish) their homework before the teacher came.',
            options: ["hadn't finished", "didn't finish"],
            correctAnswer: "hadn't finished",
        },
        {
            id: 3,
            type: 'single',
            question: '3. _____ you _____ (ever visit) the museum before?',
            options: ['Had / visited', 'Did / visit'],
            correctAnswer: 'Had / visited',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. I _____ (already eat) dinner when they arrived.',
            correctAnswer: 'had already eaten',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. She _____ (not read) the book before the exam.',
            correctAnswer: 'had not read',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. By the time he woke up, his parents _____ (leave).',
            correctAnswer: 'had left',
        },
        {
            id: 7,
            type: 'single',
            question: '7. They _____ (finish) their work before the deadline.',
            options: ['had finished', 'finished'],
            correctAnswer: 'had finished',
        },
        {
            id: 8,
            type: 'single',
            question: '8. She _____ (never be) to that restaurant before.',
            options: ['had never been', 'never was'],
            correctAnswer: 'had never been',
        },
        {
            id: 9,
            type: 'fill',
            question: '9. He _____ (learn) Spanish before he moved to Spain.',
            correctAnswer: 'had learned',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ they _____ (visit) the museum before they went to the park?',
            correctAnswer: 'Had they visited',
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
        const path = 'past-perfect';
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
            <h1>Quá khứ hoàn thành</h1>
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
                            <h3>Tổng quan về thì quá khứ hoàn thành</h3>
                            <p>
                                Thì quá khứ hoàn thành (Past Perfect) dùng để diễn tả một hành động đã xảy ra và hoàn
                                thành trước một thời điểm hoặc một hành động khác trong quá khứ.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + HAD + V3 (Past Participle) + O (Khẳng định)</p>
                            <p>S + HAD + NOT + V3 (Past Participle) + O (Phủ định)</p>
                            <p>HAD + S + V3 (Past Participle) + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I had finished my work before the meeting started. (Tôi đã hoàn thành công việc trước
                                khi cuộc họp bắt đầu.)
                                <br />
                                - They had not left when I arrived. (Họ đã không rời đi khi tôi đến.)
                                <br />- Had you eaten lunch before I called? (Bạn đã ăn trưa trước khi tôi gọi không?)
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

export default PastPerfect;
