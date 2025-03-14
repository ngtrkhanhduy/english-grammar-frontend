import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '.././Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PresentContinuousExercise = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // New state for showing the popup

    const tabs = ['Tổng quan', 'Khẳng định', 'Phủ định', 'Nghi vấn', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        'Khẳng định': [
            {
                rule: 'S + BE (am/are/is) + V-ing + O',
                examples: ['She is eating.', 'They are playing football.', 'I am studying now.'],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + BE (am/are/is) + NOT + V-ing + O',
                examples: ['He is not sleeping.', 'We are not watching TV.', 'I am not working today.'],
            },
        ],
        'Nghi vấn': [
            { rule: 'BE (am/are/is) + S + V-ing + O?', examples: ['Is she eating?', 'Are they playing football?'] },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. She _____ (read) a book right now.',
            options: ['is reading', 'reads'],
            correctAnswer: 'is reading',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (not play) football at the moment.',
            options: ["aren't playing", "don't play"],
            correctAnswer: "aren't playing",
        },
        {
            id: 3,
            type: 'single',
            question: '3. _____ he _____ (watch) TV now?',
            options: ['Is / watching', 'Does / watch'],
            correctAnswer: 'Is / watching',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. Look! The cat _____ (sleep) on the sofa.',
            correctAnswer: 'is sleeping',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. My brother _____ (not do) his homework at the moment.',
            correctAnswer: 'is not doing',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. _____ you _____ (listen) to music right now?',
            correctAnswer: 'Are you listening',
        },
        {
            id: 7,
            type: 'single',
            question: '7. The children _____ (play) in the park.',
            options: ['are playing', 'play'],
            correctAnswer: 'are playing',
        },
        {
            id: 8,
            type: 'single',
            question: '8. He _____ (not work) today because he is sick.',
            options: ["isn't working", "doesn't work"],
            correctAnswer: "isn't working",
        },
        {
            id: 9,
            type: 'fill',
            question: '9. My parents _____ (watch) the news on TV.',
            correctAnswer: 'are watching',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ your friends _____ (come) to the party?',
            correctAnswer: 'Are your friends coming',
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
        const path = 'present-continuous';
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
            <h1>Hiện tại tiếp diễn</h1>
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
                            <h3>Tổng quan về thì hiện tại tiếp diễn</h3>
                            <p>
                                Thì hiện tại tiếp diễn (Present Continuous) dùng để diễn tả hành động đang xảy ra tại
                                thời điểm nói, thói quen hoặc sự việc tạm thời. Ngoài ra, nó còn diễn tả hành động sắp
                                xảy ra trong tương lai gần.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + BE (am/are/is) + V-ing + O (Khẳng định)</p>
                            <p>S + BE (am/are/is) + NOT + V-ing + O (Phủ định)</p>
                            <p>BE (am/are/is) + S + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I am working right now. (Tôi đang làm việc ngay bây giờ.)
                                <br />
                                - She is not studying. (Cô ấy không đang học.)
                                <br />- Are they playing football? (Họ có đang chơi bóng đá không?)
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

export default PresentContinuousExercise;
