import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const FutureContinuous = () => {
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
                rule: 'S + WILL BE + V-ing + O',
                examples: [
                    'I will be working at 8 PM.',
                    'She will be studying tomorrow afternoon.',
                    'They will be traveling next week.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: "S + WILL NOT (WON'T) BE + V-ing + O",
                examples: [
                    "I will not (won't) be watching TV at that time.",
                    "She will not (won't) be studying during the weekend.",
                    "They will not (won't) be coming to the party.",
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'WILL + S + BE + V-ing + O?',
                examples: ['Will you be working at 5 PM?', 'Will they be studying at this time tomorrow?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. I _____ (study) at 8 PM tomorrow.',
            options: ['will be studying', 'will study'],
            correctAnswer: 'will be studying',
        },
        {
            id: 2,
            type: 'single',
            question: '2. She _____ (not work) at this time next week.',
            options: ["won't be working", "won't work"],
            correctAnswer: "won't be working",
        },
        {
            id: 3,
            type: 'single',
            question: '3. _____ you _____ (attend) the meeting tomorrow?',
            options: ['Will / attend', 'Will / be attending'],
            correctAnswer: 'Will / be attending',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. At this time tomorrow, I _____ (travel) to Paris.',
            correctAnswer: 'will be traveling',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. We _____ (wait) for you at 7 PM.',
            correctAnswer: 'will be waiting',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. This time next week, they _____ (celebrate) their anniversary.',
            correctAnswer: 'will be celebrating',
        },
        {
            id: 7,
            type: 'single',
            question: '7. They _____ (watch) a movie at 9 PM tomorrow.',
            options: ['will be watching', 'will watch'],
            correctAnswer: 'will be watching',
        },
        {
            id: 8,
            type: 'single',
            question: '8. He _____ (not attend) the conference next week.',
            options: ["won't be attending", "won't attend"],
            correctAnswer: "won't be attending",
        },
        {
            id: 9,
            type: 'fill',
            question: '9. I _____ (wait) for your call when I get home.',
            correctAnswer: 'will be waiting',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ you _____ (help) me with my homework tomorrow?',
            correctAnswer: 'Will you be helping',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'future-continuous';
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
            <h1>Tương lai tiếp diễn</h1>
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
                            <h3>Tổng quan về thì tương lai tiếp diễn</h3>
                            <p>
                                Thì tương lai tiếp diễn (Future Continuous) dùng để diễn tả hành động sẽ đang diễn ra
                                tại một thời điểm xác định trong tương lai.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + WILL BE + V-ing + O (Khẳng định)</p>
                            <p>S + WILL NOT (WON'T) BE + V-ing + O (Phủ định)</p>
                            <p>WILL + S + BE + V-ing + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I will be working at 8 PM.
                                <br />
                                - She will not be studying tomorrow evening.
                                <br />- Will you be studying at this time tomorrow?
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

export default FutureContinuous;
