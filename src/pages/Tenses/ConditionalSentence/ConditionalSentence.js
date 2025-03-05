import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const ConditionalSentence = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    // Đặt tên các tab theo yêu cầu
    const tabs = ['Tổng quan', 'Loại 1', 'Loại 2', 'Loại 3', 'Bài tập'];

    // Điều hướng giữa các tab
    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // Nội dung lý thuyết cho từng tab (Loại 1, Loại 2, Loại 3)
    const conditionalTypes = {
        'Loại 1': [
            {
                rule: 'If + S + V (hiện tại đơn), S + will + V (bare)',
                examples: [
                    'If you study hard, you will pass the exam.',
                    'If it rains, I will stay at home.',
                    'If we leave now, we will arrive on time.',
                ],
            },
        ],
        'Loại 2': [
            {
                rule: 'If + S + V (quá khứ đơn), S + would + V (bare)',
                examples: [
                    'If I were you, I would accept that offer.',
                    'If she had more free time, she would travel more.',
                    'If we lived in Paris, we would visit the Louvre every weekend.',
                ],
            },
        ],
        'Loại 3': [
            {
                rule: 'If + S + had + V3/ed, S + would have + V3/ed',
                examples: [
                    'If I had known you were in town, I would have invited you to my party.',
                    'If they had asked me, I would have helped them.',
                    'If we had left earlier, we would have arrived on time.',
                ],
            },
        ],
    };

    // Danh sách câu hỏi bài tập
    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'If you study hard, you _____ (pass) the exam.',
            options: ['will pass', 'would pass'],
            correctAnswer: 'will pass', // Loại 1
        },
        {
            id: 2,
            type: 'single',
            question: 'If I were you, I _____ (not do) that.',
            options: ["wouldn't do", "won't do"],
            correctAnswer: "wouldn't do", // Loại 2
        },
        {
            id: 3,
            type: 'fill',
            question: 'If I _____ (know) it was your birthday, I would have bought you a present.',
            correctAnswer: 'had known', // Loại 3
        },
        {
            id: 4,
            type: 'fill',
            question: 'If he _____ (not come) soon, we will leave.',
            correctAnswer: 'does not come', // Loại 1
        },
        {
            id: 5,
            type: 'single',
            question: 'If I _____ (have) enough money, I would buy a bigger house.',
            options: ['have', 'had'],
            correctAnswer: 'had', // Loại 2
        },
        {
            id: 6,
            type: 'fill',
            question: 'If they _____ (ask) me, I would have helped them.',
            correctAnswer: 'had asked', // Loại 3
        },
    ];

    // Xử lý khi người dùng nhập/chọn đáp án
    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    // Xử lý khi bấm nút "Check Answers"
    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map(
            (q) => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim(),
        );
        const username = Cookies.get('username');
        const path = 'conditional-sentence'; // Để cập nhật tiến trình học của user
        setResults(evaluatedResults);

        // Kiểm tra nếu tất cả câu trả lời đúng
        if (evaluatedResults.every((result) => result === true)) {
            // Nếu tất cả đúng, tiến hành PUT request để cập nhật user progress
            try {
                const response = await put(`/user-learning-process/${username}/${path}`, {
                    completed: true,
                });
                console.log('User progress updated successfully:', response);

                // Hiển thị popup thành công
                setShowPopup(true);
            } catch (error) {
                console.error('Error updating user progress:', error);
            }
        }
    };

    // Xử lý reset tất cả câu trả lời
    const handleResetAll = () => {
        setAnswers({});
        setResults(null);
    };

    // Xử lý khi đóng popup (tải lại trang)
    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <div>
            <h1>Câu điều kiện (Conditional Sentences)</h1>

            <div className={cx('exercise-container')}>
                {/* Tabs */}
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
                    {/* Tab Tổng quan */}
                    {tabIndex === 0 ? (
                        <div>
                            <h3>Tổng quan về câu điều kiện</h3>
                            <p>
                                Câu điều kiện (Conditional Sentences) được sử dụng để diễn tả một điều kiện và kết quả
                                (hoặc hệ quả) có thể xảy ra. Có nhiều loại câu điều kiện, nhưng thường gặp nhất là ba
                                loại chính:
                            </p>
                            <ul>
                                <li>
                                    <strong>Loại 1 (First Conditional):</strong> If + S + V (hiện tại đơn), S + will + V
                                    (bare) &rarr; diễn tả điều kiện có thể xảy ra trong tương lai.
                                </li>
                                <li>
                                    <strong>Loại 2 (Second Conditional):</strong> If + S + V (quá khứ đơn), S + would +
                                    V (bare) &rarr; diễn tả giả định không có thật hoặc khó xảy ra ở hiện tại/tương lai.
                                </li>
                                <li>
                                    <strong>Loại 3 (Third Conditional):</strong> If + S + had + V3/ed, S + would have +
                                    V3/ed &rarr; diễn tả giả định không có thật trong quá khứ.
                                </li>
                            </ul>
                        </div>
                    ) : // Tab Loại 1, Loại 2, Loại 3
                    tabIndex < 4 ? (
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {conditionalTypes[tabs[tabIndex]].map((item, i) => (
                                <div key={i} className={cx('rule-container')}>
                                    <p>
                                        <strong>Công thức:</strong>
                                    </p>
                                    <p className={cx('rule')}>{item.rule}</p>
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
                        // Tab Bài tập
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

            {/* Popup hiển thị khi hoàn thành tất cả câu hỏi đúng */}
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

export default ConditionalSentence;
