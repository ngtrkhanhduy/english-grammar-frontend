import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PassiveSentence = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    // Các tab cho nội dung về câu bị động
    const tabs = ['Tổng quan', 'Cấu trúc', 'Chuyển đổi', 'Ví dụ', 'Bài tập'];

    // Điều hướng giữa các tab
    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // Nội dung cho các tab (trừ "Bài tập")
    // Có thể điều chỉnh/ phát triển thêm tùy ý
    const passiveContent = {
        'Cấu trúc': [
            {
                title: 'Cấu trúc chung',
                rule: 'S + (to be) + V3/ed + (by + O)',
                examples: [
                    'Active: She writes a letter. → Passive: A letter is written by her.',
                    'Active: He wrote a letter. → Passive: A letter was written by him.',
                    'Active: They are cooking dinner. → Passive: Dinner is being cooked by them.',
                ],
            },
        ],
        'Chuyển đổi': [
            {
                title: 'Quy tắc chuyển đổi câu chủ động sang câu bị động',
                rule: [
                    '1. Xác định tân ngữ (object) của câu chủ động → trở thành chủ ngữ (subject) của câu bị động.',
                    '2. Xác định thì (tense) của động từ chính → áp dụng dạng “to be” tương ứng.',
                    '3. Động từ chính chuyển về dạng V3/ed (past participle).',
                    '4. Chủ ngữ của câu chủ động (nếu cần) được thêm vào sau “by”.',
                ].join('\n'),
                examples: [
                    'Active: The teacher explains the lesson. → Passive: The lesson is explained by the teacher.',
                    'Active: My father will repair the car. → Passive: The car will be repaired by my father.',
                ],
            },
        ],
        'Ví dụ': [
            {
                title: 'Ví dụ câu bị động trong các thì phổ biến',
                rule: null,
                examples: [
                    'Present Simple: The house is cleaned every day.',
                    'Present Continuous: The house is being cleaned right now.',
                    'Past Simple: The house was cleaned yesterday.',
                    'Future Simple: The house will be cleaned tomorrow.',
                ],
            },
        ],
    };

    // Danh sách bài tập
    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'A letter _____ (write) by him every day.',
            options: ['is written', 'was written'],
            correctAnswer: 'is written', // Present Simple Passive
        },
        {
            id: 2,
            type: 'single',
            question: 'My car _____ (repair) yesterday.',
            options: ['is repaired', 'was repaired'],
            correctAnswer: 'was repaired', // Past Simple Passive
        },
        {
            id: 3,
            type: 'fill',
            question: 'The cake _____ (make) by my mother right now.',
            correctAnswer: 'is being made', // Present Continuous Passive
        },
        {
            id: 4,
            type: 'fill',
            question: 'This song _____ (compose) by Beethoven.',
            correctAnswer: 'was composed', // Past Simple Passive
        },
        {
            id: 5,
            type: 'single',
            question: 'Many houses _____ (destroy) by the storm last week.',
            options: ['are destroyed', 'were destroyed'],
            correctAnswer: 'were destroyed', // Past Simple Passive
        },
        {
            id: 6,
            type: 'fill',
            question: 'English _____ (speak) in many countries.',
            correctAnswer: 'is spoken', // Present Simple Passive
        },
    ];

    // Xử lý khi người dùng nhập/chọn đáp án
    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    // Xử lý khi bấm "Check Answers"
    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map(
            (q) => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim(),
        );
        setResults(evaluatedResults);

        const username = Cookies.get('username');
        const path = 'passive-sentence'; // để cập nhật đúng tiến trình

        // Kiểm tra nếu tất cả đáp án đều đúng
        if (evaluatedResults.every((result) => result === true)) {
            try {
                // PUT request cập nhật user progress
                const response = await put(`/user-learning-process/${username}/${path}`, {
                    completed: true,
                });
                console.log('User progress updated successfully:', response);
                setShowPopup(true); // hiển thị popup
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
            <h1>Câu Bị Động (Passive Voice)</h1>

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

                {/* Nội dung chính theo từng tab */}
                <div className={cx('content')}>
                    {/* Tab 0: Tổng quan */}
                    {tabIndex === 0 ? (
                        <div>
                            <h3>Tổng quan về câu bị động</h3>
                            <p>
                                Câu bị động (Passive Voice) được sử dụng khi người hoặc vật chịu tác động của hành động
                                được nhấn mạnh hơn là người hoặc vật thực hiện hành động. Thông thường, chủ ngữ của câu
                                bị động là tân ngữ của câu chủ động.
                            </p>
                            <p>
                                Cấu trúc chung: <strong>S + to be + V3/ed + (by O)</strong> <br />
                                (Trong đó <strong>"to be"</strong> chia theo thì của động từ chính trong câu chủ động.)
                            </p>
                        </div>
                    ) : tabIndex > 0 && tabIndex < 4 ? (
                        // Tabs "Cấu trúc", "Chuyển đổi", "Ví dụ"
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {passiveContent[tabs[tabIndex]] &&
                                passiveContent[tabs[tabIndex]].map((item, i) => (
                                    <div key={i} className={cx('rule-container')}>
                                        {item.title && (
                                            <p>
                                                <strong>{item.title}</strong>
                                            </p>
                                        )}

                                        {/* Rule: có thể là chuỗi hoặc mảng nhiều dòng */}
                                        {item.rule && (
                                            <div className={cx('rule')}>
                                                {item.rule.split('\n').map((line, idx) => (
                                                    <p key={idx}>{line}</p>
                                                ))}
                                            </div>
                                        )}

                                        {/* Ví dụ */}
                                        {item.examples && item.examples.length > 0 && (
                                            <>
                                                <p>
                                                    <strong>Ví dụ:</strong>
                                                </p>
                                                {item.examples.map((ex, idx) => (
                                                    <p key={idx}>{ex}</p>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        // Tab cuối: Bài tập
                        <div>
                            {questions.map((q, index) => (
                                <div key={q.id} className={cx('question')}>
                                    <p>{q.question}</p>
                                    {/* Chọn đáp án hoặc nhập đáp án */}
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
                                    {/* Hiển thị kết quả sau khi Check */}
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

                {/* Nút điều hướng tab */}
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

export default PassiveSentence;
