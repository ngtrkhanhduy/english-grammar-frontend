import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const VerbLesson = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Động từ thường', 'Động từ bất quy tắc', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Động từ thường': [
            {
                rule: 'Động từ thường là những động từ có quy tắc chia thì theo chủ ngữ và thời gian.',
                examples: ['work → worked', 'play → played', 'listen → listened'],
            },
        ],
        'Động từ bất quy tắc': [
            {
                rule: 'Động từ bất quy tắc không tuân theo quy tắc thêm "ed" khi chia thì quá khứ.',
                examples: ['go → went', 'eat → ate', 'see → saw'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. Which of the following is an action verb?',
            options: ['run', 'happy'],
            correctAnswer: 'run',
        },
        {
            id: 2,
            type: 'single',
            question: '2. Which of the following is a linking verb?',
            options: ['is', 'run'],
            correctAnswer: 'is',
        },
        {
            id: 3,
            type: 'single',
            question: '3. What is the past tense of "go"?',
            options: ['went', 'goes'],
            correctAnswer: 'went',
        },
        {
            id: 4,
            type: 'single',
            question: '4. What is the present tense of "eat"?',
            options: ['ate', 'eat'],
            correctAnswer: 'eat',
        },
        {
            id: 5,
            type: 'single',
            question: '5. What is the correct form of the verb for "she _____ (sing) beautifully"?',
            options: ['sings', 'sing'],
            correctAnswer: 'sings',
        },
        {
            id: 6,
            type: 'single',
            question: '6. What is the past participle of "write"?',
            options: ['writed', 'written'],
            correctAnswer: 'written',
        },
        {
            id: 7,
            type: 'single',
            question: '7. Which of the following is an irregular verb?',
            options: ['jump', 'run'],
            correctAnswer: 'run',
        },
        {
            id: 8,
            type: 'single',
            question: '8. What is the future tense of "help"?',
            options: ['will help', 'helps'],
            correctAnswer: 'will help',
        },
        {
            id: 9,
            type: 'single',
            question: '9. What is the correct form of the verb for "they _____ (study) every day"?',
            options: ['study', 'studies'],
            correctAnswer: 'study',
        },
        {
            id: 10,
            type: 'single',
            question: '10. What is the present continuous form of "run"?',
            options: ['is running', 'run'],
            correctAnswer: 'is running',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'verb';
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
            <h1>Bài học về Động từ</h1>
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
                            <h3>Tổng quan về Động từ</h3>
                            <p>Động từ là từ chỉ hành động hoặc trạng thái của chủ thể trong câu.</p>
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

export default VerbLesson;
