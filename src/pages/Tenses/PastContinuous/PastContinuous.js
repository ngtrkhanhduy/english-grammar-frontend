import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PastContinuous = () => {
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
                rule: 'S + WAS/WERE + V-ing + O',
                examples: [
                    'She was reading a book when I called her.',
                    'They were playing football at 5 PM yesterday.',
                    'I was working all day yesterday.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + WAS/WERE + NOT + V-ing + O',
                examples: [
                    'He was not sleeping when I arrived.',
                    'We were not watching TV last night.',
                    'I was not working at that time.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'WAS/WERE + S + V-ing + O?',
                examples: ['Was she reading when you called?', 'Were they playing football?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. She _____ (cook) dinner when I arrived.',
            options: ['was cooking', 'cooked'],
            correctAnswer: 'was cooking',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (not watch) TV at 8 PM yesterday.',
            options: ["weren't watching", "didn't watch"],
            correctAnswer: "weren't watching",
        },
        {
            id: 3,
            type: 'single',
            question: '3. What _____ you _____ (do) at this time last night?',
            options: ['were / doing', 'did / do'],
            correctAnswer: 'were / doing',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. I _____ (sleep) when the phone rang.',
            correctAnswer: 'was sleeping',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. My friends _____ (not play) soccer when I saw them.',
            correctAnswer: 'were not playing',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. _____ she _____ (study) when you called?',
            correctAnswer: 'Was she studying',
        },
        {
            id: 7,
            type: 'single',
            question: '7. The children _____ (play) in the garden when it started to rain.',
            options: ['were playing', 'played'],
            correctAnswer: 'were playing',
        },
        {
            id: 8,
            type: 'single',
            question: '8. He _____ (not work) at 10 AM yesterday.',
            options: ["wasn't working", "didn't work"],
            correctAnswer: "wasn't working",
        },
        {
            id: 9,
            type: 'fill',
            question: '9. While my mom _____ (cook), my dad was reading the newspaper.',
            correctAnswer: 'was cooking',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ they _____ (walk) to school when you saw them?',
            correctAnswer: 'Were they walking',
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
        const path = 'past-continuous';
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
            <h1>Quá khứ tiếp diễn</h1>
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
                            <h3>Tổng quan về thì quá khứ tiếp diễn</h3>
                            <p>
                                Thì quá khứ tiếp diễn (Past Continuous) dùng để diễn tả hành động đang xảy ra tại một
                                thời điểm cụ thể trong quá khứ. Thì này cũng được dùng để diễn tả hai hành động xảy ra
                                đồng thời trong quá khứ.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + WAS/WERE + V-ing + O (Khẳng định)</p>
                            <p>S + WAS/WERE + NOT + V-ing + O (Phủ định)</p>
                            <p>WAS/WERE + S + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I was watching TV when you called me. (Tôi đang xem TV khi bạn gọi tôi.)
                                <br />
                                - They were not playing football at 3 PM. (Họ không chơi bóng đá lúc 3 giờ chiều.)
                                <br />- Was she studying when you came? (Cô ấy có đang học khi bạn đến không?)
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

export default PastContinuous;
