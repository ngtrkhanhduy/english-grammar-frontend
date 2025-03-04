import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PresentPerfect = () => {
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
                rule: 'S + HAVE/HAS + PAST PARTICIPLE (V3)',
                examples: [
                    'She has visited Paris.',
                    'They have finished their homework.',
                    'I have lived in Hanoi for 10 years.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + HAVE/HAS + NOT + PAST PARTICIPLE (V3)',
                examples: [
                    'He has not seen that movie.',
                    'We have not started the meeting.',
                    'I have not read that book.',
                ],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'HAVE/HAS + S + PAST PARTICIPLE (V3)?',
                examples: ['Has she visited Paris?', 'Have they finished their homework?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: '1. She _____ (visit) Paris several times.',
            options: ['has visited', 'visited'],
            correctAnswer: 'has visited',
        },
        {
            id: 2,
            type: 'single',
            question: '2. They _____ (not finish) their homework yet.',
            options: ["haven't finished", "didn't finish"],
            correctAnswer: "haven't finished",
        },
        {
            id: 3,
            type: 'single',
            question: '3. _____ you ever _____ (see) a kangaroo?',
            options: ['Have / seen', 'Did / see'],
            correctAnswer: 'Have / seen',
        },
        {
            id: 4,
            type: 'fill',
            question: '4. I _____ (just eat) lunch.',
            correctAnswer: 'have just eaten',
        },
        {
            id: 5,
            type: 'fill',
            question: '5. My parents _____ (not be) to London before.',
            correctAnswer: 'have not been',
        },
        {
            id: 6,
            type: 'fill',
            question: '6. _____ he ever _____ (try) sushi?',
            correctAnswer: 'Has he ever tried',
        },
        {
            id: 7,
            type: 'single',
            question: '7. The baby _____ (fall) asleep.',
            options: ['has fallen', 'fell'],
            correctAnswer: 'has fallen',
        },
        {
            id: 8,
            type: 'single',
            question: '8. I _____ (not see) her since last week.',
            options: ["haven't seen", "didn't see"],
            correctAnswer: "haven't seen",
        },
        {
            id: 9,
            type: 'fill',
            question: '9. We _____ (live) in this city for 10 years.',
            correctAnswer: 'have lived',
        },
        {
            id: 10,
            type: 'fill',
            question: '10. _____ your brother _____ (finish) his work?',
            correctAnswer: 'Has your brother finished',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'present-perfect';
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
            <h1>Hiện tại hoàn thành</h1>
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
                            <h3>Tổng quan về thì hiện tại hoàn thành</h3>
                            <p>
                                Thì hiện tại hoàn thành (Present Perfect) được sử dụng để diễn tả hành động đã xảy ra
                                nhưng có kết quả ảnh hưởng đến hiện tại, hoặc hành động xảy ra trong quá khứ nhưng không
                                xác định thời gian cụ thể.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + HAVE/HAS + PAST PARTICIPLE (V3) (Khẳng định)</p>
                            <p>S + HAVE/HAS + NOT + PAST PARTICIPLE (V3) (Phủ định)</p>
                            <p>HAVE/HAS + S + PAST PARTICIPLE (V3)? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I have lived in this city for 5 years. (Tôi đã sống ở thành phố này 5 năm.)
                                <br />
                                - She hasn't seen that movie. (Cô ấy chưa xem bộ phim đó.)
                                <br />- Have they finished their homework? (Họ đã hoàn thành bài tập chưa?)
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

export default PresentPerfect;
