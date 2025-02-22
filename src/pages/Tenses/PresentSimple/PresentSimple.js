import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PresentSimpleExercise.module.scss';

const cx = classNames.bind(styles);

const PresentSimpleExercise = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    const tabs = ['Khẳng định', 'Phủ định', 'Nghi vấn', 'Bài tập'];

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

    const handleCheckAnswers = () => {
        const evaluatedResults = questions.map((q) => answers[q.id] === q.correctAnswer);
        setResults(evaluatedResults);
    };

    const handleResetAll = () => {
        setAnswers({});
        setResults(null);
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
                    {tabIndex < 3 ? (
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
        </div>
    );
};

export default PresentSimpleExercise;
