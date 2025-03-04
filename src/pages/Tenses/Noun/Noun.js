import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const NounLesson = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Danh từ đếm được', 'Danh từ không đếm được', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Danh từ đếm được': [
            {
                rule: 'Danh từ đếm được là những danh từ có thể đếm được, có dạng số ít và số nhiều.',
                examples: ['apple → apples', 'book → books', 'car → cars'],
            },
        ],
        'Danh từ không đếm được': [
            {
                rule: 'Danh từ không đếm được là những danh từ không thể đếm trực tiếp bằng số và không có dạng số nhiều.',
                examples: ['water', 'money', 'information'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'Which of the following is an action verb?',
            options: ['run', 'happy'],
            correctAnswer: 'run',
        },
        {
            id: 2,
            type: 'single',
            question: 'Which of the following is a linking verb?',
            options: ['is', 'run'],
            correctAnswer: 'is',
        },
        {
            id: 3,
            type: 'single',
            question: 'What is the past tense of "go"?',
            options: ['went', 'goes'],
            correctAnswer: 'went',
        },
        {
            id: 4,
            type: 'single',
            question:
                'Which of the following is the correct form of the verb for "she _____ (write) a letter every day"?',
            options: ['writes', 'writed'],
            correctAnswer: 'writes',
        },
        {
            id: 5,
            type: 'single',
            question: 'Which of the following is the correct form of the verb for "they _____ (play) football now"?',
            options: ['are playing', 'play'],
            correctAnswer: 'are playing',
        },
        {
            id: 6,
            type: 'single',
            question: 'What is the correct form of the verb for "I _____ (eat) dinner when you called me"?',
            options: ['was eating', 'ate'],
            correctAnswer: 'was eating',
        },
        {
            id: 7,
            type: 'single',
            question: 'Which of the following is an irregular verb?',
            options: ['run', 'runs'],
            correctAnswer: 'run',
        },
        {
            id: 8,
            type: 'single',
            question: 'What is the past participle of "take"?',
            options: ['took', 'taken'],
            correctAnswer: 'taken',
        },
        {
            id: 9,
            type: 'single',
            question: 'What is the correct form of the verb for "they _____ (study) for the test when I saw them"?',
            options: ['were studying', 'studied'],
            correctAnswer: 'were studying',
        },
        {
            id: 10,
            type: 'single',
            question: 'What is the correct form of the verb for "I _____ (help) my friend with homework tomorrow"?',
            options: ['will help', 'help'],
            correctAnswer: 'will help',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'noun';
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
            <h1>Bài học về Danh từ</h1>
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
                            <h3>Tổng quan về Danh từ</h3>
                            <p>Danh từ là từ dùng để chỉ người, vật, địa điểm, hoặc ý tưởng.</p>
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
                                    <p>{q.question}</p>
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

export default NounLesson;
