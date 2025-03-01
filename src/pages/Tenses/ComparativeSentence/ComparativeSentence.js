import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const ComparativeSentence = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    // Tabs for comparative sentences
    const tabs = ['Tổng quan', 'So sánh ngắn', 'So sánh dài', 'Trường hợp đặc biệt', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // Rules and examples for each tab (except for Tổng quan and Bài tập)
    const exercises = {
        'So sánh ngắn': [
            {
                rule: 'S + be + adj + “-er” + than + O (dành cho tính từ ngắn, thường 1-2 âm tiết).',
                examples: ['She is taller than her brother.', 'This box is bigger than that one.'],
            },
        ],
        'So sánh dài': [
            {
                rule: 'S + be + more + adj + than + O (dành cho tính từ dài, thường 2+ âm tiết hoặc không theo quy tắc).',
                examples: [
                    'This problem is more difficult than the last one.',
                    'She is more confident than her classmates.',
                ],
            },
        ],
        'Trường hợp đặc biệt': [
            {
                rule: `Một số tính từ bất quy tắc:
- good → better
- bad → worse
- far → farther/further
- many/much → more
- little → less
                `,
                examples: ['He is better at math than I am.', 'The weather is worse today than yesterday.'],
            },
        ],
    };

    // Example questions for comparative sentences
    const questions = [
        // 1) Single-choice
        {
            id: 1,
            type: 'single',
            question: 'My house is ____ (big) than yours.',
            options: ['bigger', 'big'],
            correctAnswer: 'bigger',
        },
        // 2) Single-choice
        {
            id: 2,
            type: 'single',
            question: 'This test is ____ (difficult) than the last one.',
            options: ['difficult', 'more difficult'],
            correctAnswer: 'more difficult',
        },
        // 3) Single-choice
        {
            id: 3,
            type: 'single',
            question: 'The weather today is ____ (bad) than yesterday.',
            options: ['worse', 'worsen'],
            correctAnswer: 'worse',
        },
        // 4) Fill-in
        {
            id: 4,
            type: 'fill',
            question: 'She is ____ (tall) than her brother.',
            correctAnswer: 'taller',
        },
        // 5) Fill-in
        {
            id: 5,
            type: 'fill',
            question: 'This book is ____ (interesting) than that one.',
            correctAnswer: 'more interesting',
        },
        // 6) Fill-in
        {
            id: 6,
            type: 'fill',
            question: 'He drives ____ (careful) than I do.',
            correctAnswer: 'more carefully',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        // Compare each answer with the correct one
        const evaluatedResults = questions.map(
            (q) => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim(),
        );

        // For updating user progress
        const username = Cookies.get('username');
        const path = 'comparative-sentence'; // Adjust this if needed

        setResults(evaluatedResults);

        // If all answers are correct, update progress
        if (evaluatedResults.every((result) => result === true)) {
            try {
                const response = await put(`/user-learning-process/${username}/${path}`, {
                    completed: true,
                });
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
        // Reload the page after clicking "OK" in the popup
        window.location.reload();
    };

    return (
        <div>
            <h1>Câu So Sánh (Comparative Sentences)</h1>
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
                            <h3>Tổng quan về Câu So Sánh</h3>
                            <p>
                                Câu so sánh (Comparative sentences) được dùng để so sánh hai đối tượng về mức độ của một
                                tính chất nào đó. Có hai dạng chính:
                            </p>
                            <ul>
                                <li>
                                    <strong>So sánh ngắn (Short Adjectives)</strong>:
                                    <br />
                                    Thêm <code>-er</code> vào tính từ rồi theo sau là <code>than</code>.
                                </li>
                                <li>
                                    <strong>So sánh dài (Long Adjectives)</strong>:
                                    <br />
                                    Dùng <code>more</code> + tính từ rồi theo sau là <code>than</code>.
                                </li>
                            </ul>
                            <p>
                                Có một số trường hợp bất quy tắc (irregular), ví dụ: <code>good → better</code>,{' '}
                                <code>bad → worse</code>, <code>far → farther/further</code>,...
                            </p>
                            <p>
                                Ví dụ:
                                <br />- <em>My car is bigger than yours.</em>
                                <br />- <em>She is more intelligent than her friends.</em>
                                <br />- <em>This exam is worse than the previous one.</em>
                            </p>
                        </div>
                    ) : tabIndex < 4 ? (
                        // Renders "So sánh ngắn", "So sánh dài", or "Trường hợp đặc biệt"
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {exercises[tabs[tabIndex]]?.map((item, i) => (
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
                        // "Bài tập" tab content
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

export default ComparativeSentence;
