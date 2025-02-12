import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './PresentSimpleExercise.module.scss';

const cx = classNames.bind(styles);

const PresentSimpleExercise = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleCheckboxChange = (questionId, value) => {
        const currentAnswers = answers[questionId] || [];
        if (currentAnswers.includes(value)) {
            setAnswers({
                ...answers,
                [questionId]: currentAnswers.filter((answer) => answer !== value),
            });
        } else {
            setAnswers({
                ...answers,
                [questionId]: [...currentAnswers, value],
            });
        }
    };

    const handleCheckAnswers = () => {
        const evaluatedResults = questions.map((q) => {
            if (q.type === 'single' || q.type === 'fill') {
                return answers[q.id] === q.correctAnswer;
            } else if (q.type === 'multiple') {
                const correctSet = new Set(q.correctAnswer);
                const userSet = new Set(answers[q.id] || []);
                return (
                    q.correctAnswer.length === (answers[q.id] || []).length &&
                    Array.from(correctSet).every((answer) => userSet.has(answer))
                );
            }
            return false;
        });

        setResults(evaluatedResults);
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. She _____ to the gym every morning.',
            options: ['go', 'goes'],
            correctAnswer: 'goes',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ breakfast at 8 AM every day.',
            options: ['have', 'has'],
            correctAnswer: 'have',
        },
        {
            id: 3,
            type: 'multiple',
            question: '3. Select the verbs that describe daily routines:',
            options: ['eat', 'sleep', 'run', 'think'],
            correctAnswer: ['eat', 'sleep', 'run'],
        },
        {
            id: 4,
            type: 'multiple',
            question: '4. Select the sentences that are in present simple:',
            options: [
                'She works every day.',
                'He is working now.',
                'They play football on weekends.',
                'I was reading a book.',
            ],
            correctAnswer: ['She works every day.', 'They play football on weekends.'],
        },
        {
            id: 5,
            type: 'fill',
            question: '5. I _____ (to read) a book every evening.',
            correctAnswer: 'read',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. He always _____ (to drink) coffee in the morning.',
            correctAnswer: 'drinks',
        },
    ];

    return (
        <div className={cx('exercise-container')}>
            <div className={cx('header')}>
                <h2>Present Simple Exercise</h2>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }}
                    className={cx('toggle-link')}
                >
                    {isExpanded ? 'Collapse' : 'Expand'}
                </a>
            </div>
            {isExpanded && (
                <div>
                    {questions.map((q, index) => (
                        <div key={q.id} className={cx('question')}>
                            <p>{q.question}</p>
                            {q.type === 'single' && (
                                <div className={cx('single-choice')}>
                                    {q.options.map((option) => (
                                        <label key={option} className={cx('option')}>
                                            <input
                                                type="radio"
                                                name={`question-${q.id}`}
                                                value={option}
                                                checked={answers[q.id] === option}
                                                onChange={() => handleInputChange(q.id, option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === 'multiple' && (
                                <div className={cx('multiple-choice')}>
                                    {q.options.map((option) => (
                                        <label key={option} className={cx('option')}>
                                            <input
                                                type="checkbox"
                                                name={`question-${q.id}`}
                                                value={option}
                                                checked={answers[q.id]?.includes(option)}
                                                onChange={() => handleCheckboxChange(q.id, option)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === 'fill' && (
                                <div className={cx('fill-blank')}>
                                    <input
                                        type="text"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                                        className={cx('input')}
                                    />
                                </div>
                            )}
                            {results && (
                                <p className={cx(results[index] ? 'correct' : 'incorrect')}>
                                    {results[index] ? (
                                        <span style={{ color: 'green' }}>Correct!</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>Incorrect!</span>
                                    )}
                                </p>
                            )}
                        </div>
                    ))}
                    <button onClick={handleCheckAnswers} className={cx('check-button')}>
                        Check Answers
                    </button>
                </div>
            )}
        </div>
    );
};

export default PresentSimpleExercise;
