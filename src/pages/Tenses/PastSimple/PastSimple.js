import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PastSimple = () => {
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
                rule: 'S + PAST FORM OF VERB + O',
                examples: [
                    'She visited Paris last summer.',
                    'They played football yesterday.',
                    'I watched a movie last night.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + DID NOT + BASE FORM OF VERB + O',
                examples: ['He did not go to the party.', 'We did not visit the museum.', 'I did not like the food.'],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'DID + S + BASE FORM OF VERB + O?',
                examples: ['Did she visit Paris?', 'Did they play football?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'I _____ (go) to the cinema yesterday.',
            options: ['went', 'go'],
            correctAnswer: 'went',
        },
        {
            id: 2,
            type: 'single',
            question: 'She _____ (not like) the movie.',
            options: ["didn't like", "don't like"],
            correctAnswer: "didn't like",
        },
        {
            id: 3,
            type: 'single',
            question: '_____ you _____ (see) the new movie?',
            options: ['Do / see', 'Did / see'],
            correctAnswer: 'Did / see',
        },
        {
            id: 4,
            type: 'fill',
            question: 'He _____ (play) football last Sunday.',
            correctAnswer: 'played',
        },
        {
            id: 5,
            type: 'fill',
            question: 'They _____ (not visit) the museum last week.',
            correctAnswer: 'did not visit',
        },
        {
            id: 6,
            type: 'fill',
            question: '_____ she _____ (finish) her homework?',
            correctAnswer: 'Did she finish',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) => answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase());
        const username = Cookies.get('username');
        const path = 'past-simple';
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
            <h1>Quá khứ đơn</h1>
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
                            <h3>Tổng quan về thì quá khứ đơn</h3>
                            <p>
                                Thì quá khứ đơn (Past Simple) được sử dụng để diễn tả hành động đã xảy ra và kết thúc
                                trong quá khứ.
                            </p>
                            <p>
                                <strong>Công thức:</strong>
                            </p>
                            <p>S + PAST FORM OF VERB + O (Khẳng định)</p>
                            <p>S + DID NOT + BASE FORM OF VERB + O (Phủ định)</p>
                            <p>DID + S + BASE FORM OF VERB + O? (Câu hỏi)</p>
                            <p>
                                Ví dụ:
                                <br />
                                - I watched a movie last night. (Tôi đã xem một bộ phim tối qua.)
                                <br />
                                - They didn't go to the party. (Họ đã không đi đến bữa tiệc.)
                                <br />- Did you play football yesterday? (Bạn có chơi bóng đá hôm qua không?)
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

export default PastSimple;
