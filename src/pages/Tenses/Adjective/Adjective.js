import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const AdjectiveLesson = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Tính từ miêu tả', 'Tính từ so sánh', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Tính từ miêu tả': [
            {
                rule: 'Tính từ miêu tả dùng để mô tả đặc điểm, trạng thái của danh từ.',
                examples: ['beautiful', 'tall', 'happy'],
            },
        ],
        'Tính từ so sánh': [
            {
                rule: 'Tính từ so sánh được sử dụng để so sánh sự khác nhau giữa hai hoặc nhiều đối tượng.',
                examples: ['big → bigger → biggest', 'happy → happier → happiest'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'Which is a descriptive adjective?',
            options: ['happy', 'more'],
            correctAnswer: 'happy',
        },
        {
            id: 2,
            type: 'single',
            question: 'Which is a comparative adjective?',
            options: ['tall', 'taller'],
            correctAnswer: 'taller',
        },
        {
            id: 3,
            type: 'fill-in',
            question: 'Complete the sentence: She is the ____ person I know.',
            correctAnswer: 'happiest',
        },
        {
            id: 4,
            type: 'multiple',
            question: 'Which of these are comparative adjectives?',
            options: ['smaller', 'more beautiful', 'biggest', 'more tall'],
            correctAnswer: ['smaller', 'more beautiful', 'more tall'],
        },
        {
            id: 5,
            type: 'matching',
            question: 'Match the adjectives with their comparative forms:',
            options: [
                { adjective: 'big', comparative: 'bigger' },
                { adjective: 'good', comparative: 'better' },
                { adjective: 'happy', comparative: 'happier' },
            ],
            correctAnswer: [
                { adjective: 'big', comparative: 'bigger' },
                { adjective: 'good', comparative: 'better' },
                { adjective: 'happy', comparative: 'happier' },
            ],
        },
        {
            id: 6,
            type: 'order',
            question:
                'Arrange the following words in the correct order to form a sentence: "happier / she / than / is / I".',
            correctAnswer: 'She is happier than I.',
        },
        {
            id: 7,
            type: 'true-false',
            question: 'True or False: "Tall" is a comparative adjective.',
            correctAnswer: false,
        },
        {
            id: 8,
            type: 'single',
            question: 'Which is a superlative adjective?',
            options: ['tallest', 'bigger'],
            correctAnswer: 'tallest',
        },
        {
            id: 9,
            type: 'fill-in',
            question: 'Complete the sentence: This is the ____ house in the neighborhood.',
            correctAnswer: 'largest',
        },
        {
            id: 10,
            type: 'multiple',
            question: 'Which of these are descriptive adjectives?',
            options: ['tall', 'most beautiful', 'happiest', 'blue'],
            correctAnswer: ['tall', 'blue'],
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) =>
            Array.isArray(answers[q.id])
                ? JSON.stringify(answers[q.id]) === JSON.stringify(q.correctAnswer)
                : answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase(),
        );
        const username = Cookies.get('username');
        const path = 'adjective';
        setResults(evaluatedResults);

        if (evaluatedResults.every((result) => result === true)) {
            try {
                const response = await put(`/user-learning-process/${username}/${path}`, { completed: true });
                console.log('User progress updated successfully:', response);
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
        window.location.reload();
    };

    return (
        <div>
            <h1>Bài học về Tính từ</h1>
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
                        <div>
                            <h3>Tổng quan về Tính từ</h3>
                            <p>Tính từ là từ dùng để mô tả đặc điểm, trạng thái của danh từ.</p>
                        </div>
                    ) : tabIndex < 3 ? (
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {exercises[tabs[tabIndex]].map((item, i) => (
                                <div key={i} className={cx('rule-container')}>
                                    <p>
                                        <strong>Định nghĩa:</strong>
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
                                    <p>
                                        <strong>{index + 1}. </strong>
                                        {q.question}
                                    </p>
                                    {q.type === 'single' || q.type === 'multiple' ? (
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
                                    ) : q.type === 'fill-in' ? (
                                        <input
                                            type="text"
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        />
                                    ) : q.type === 'matching' ? (
                                        <div>
                                            {q.options.map((pair, idx) => (
                                                <div key={idx}>
                                                    <strong>{pair.adjective}</strong> -{' '}
                                                    <input
                                                        type="text"
                                                        value={answers[q.id]?.[idx]?.comparative || ''}
                                                        onChange={(e) => {
                                                            const newAnswers = [...(answers[q.id] || [])];
                                                            newAnswers[idx] = {
                                                                ...newAnswers[idx],
                                                                comparative: e.target.value,
                                                            };
                                                            setAnswers({ ...answers, [q.id]: newAnswers });
                                                        }}
                                                        disabled={results !== null}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : q.type === 'order' ? (
                                        <input
                                            type="text"
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        />
                                    ) : q.type === 'true-false' ? (
                                        <select
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        >
                                            <option value="">--Chọn đúng/sai--</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    ) : null}

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

export default AdjectiveLesson;
