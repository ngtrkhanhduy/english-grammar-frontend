import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const AdverbLesson = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Trạng từ chỉ cách thức', 'Trạng từ chỉ tần suất', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Trạng từ chỉ cách thức': [
            {
                rule: 'Trạng từ chỉ cách thức mô tả cách một hành động được thực hiện.',
                examples: ['quickly', 'slowly', 'carefully'],
            },
        ],
        'Trạng từ chỉ tần suất': [
            {
                rule: 'Trạng từ chỉ tần suất mô tả mức độ thường xuyên của một hành động.',
                examples: ['always', 'usually', 'sometimes'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'Which is an adverb of manner?',
            options: ['quickly', 'happy'],
            correctAnswer: 'quickly',
        },
        {
            id: 2,
            type: 'single',
            question: 'Which is an adverb of frequency?',
            options: ['always', 'big'],
            correctAnswer: 'always',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'adverb';
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
            <h1>Bài học về Trạng từ</h1>
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
                            <h3>Tổng quan về Trạng từ</h3>
                            <p>Trạng từ là từ dùng để bổ nghĩa cho động từ, tính từ hoặc trạng từ khác.</p>
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

export default AdverbLesson;
