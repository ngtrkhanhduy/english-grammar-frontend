import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const ReportedSpeech = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    // You can keep these tab titles or rename them as you wish.
    // For example, you could use: ["Tổng quan", "Câu trần thuật", "Câu hỏi", "Mệnh lệnh/Đề nghị", "Bài tập"].
    const tabs = ['Tổng quan', 'Khẳng định', 'Phủ định', 'Nghi vấn', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // Adjusted content about reported speech
    const exercises = {
        'Khẳng định': [
            {
                rule: 'S + said (that) + S + V (backshifted tense) + ...',
                examples: [
                    'He said (that) he lived in London.',
                    'They told me (that) they would come later.',
                    'She said she was studying at that time.',
                ],
            },
        ],
        'Phủ định': [
            {
                rule: 'S + said (that) + S + did not + V (backshifted tense) + ...',
                examples: ['He said (that) he did not like the food.', 'She told me she hadn’t seen the movie.'],
            },
        ],
        'Nghi vấn': [
            {
                rule: 'S + asked (O) + if/whether + S + V (backshifted tense) + ...',
                examples: ['He asked if I had finished my homework.', 'She asked me whether I knew the answer.'],
            },
        ],
    };

    // Example exercises for reported speech
    const questions = [
        {
            id: 1,
            type: 'single',
            question: `1) Direct speech: "She said, 'I am tired.'" 
→ Reported speech: She said she _____.`,
            options: ['am tired', 'was tired'],
            correctAnswer: 'was tired',
        },
        {
            id: 2,
            type: 'single',
            question: `2) Direct speech: "He told me, 'I can't come today.'" 
→ Reported speech: He told me he _____ come that day.`,
            options: ["couldn't", "can't"],
            correctAnswer: "couldn't",
        },
        {
            id: 3,
            type: 'single',
            question: `3) Direct speech: "They said, 'We will go tomorrow.'" 
→ Reported speech: They said they _____ the next day.`,
            options: ['would go', 'will go'],
            correctAnswer: 'would go',
        },
        {
            id: 4,
            type: 'fill',
            question: `4) Direct speech: "Mom asked, 'Did you finish your homework?'" 
→ Reported speech: Mom asked me if I ____ my homework.`,
            correctAnswer: 'had finished',
        },
        {
            id: 5,
            type: 'fill',
            question: `5) Direct speech: "She asked, 'Where are you going?'" 
→ Reported speech: She asked me _____ I was going.`,
            correctAnswer: 'where',
        },
        {
            id: 6,
            type: 'fill',
            question: `6) Direct speech: "He said, 'I have been to Japan.'" 
→ Reported speech: He said he ____ to Japan.`,
            correctAnswer: 'had been',
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
        // Change this path to whatever your backend route for reported speech is
        const path = 'reported-speech';

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
            <h1>Câu tường thuật (Reported Speech)</h1>
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
                            <h3>Tổng quan về Câu tường thuật</h3>
                            <p>
                                <strong>Câu tường thuật (Reported Speech)</strong> được dùng khi chúng ta muốn thuật lại
                                lời nói hoặc suy nghĩ của ai đó mà không trích dẫn nguyên văn.
                            </p>
                            <p>
                                <strong>Các thay đổi chính trong câu tường thuật:</strong>
                            </p>
                            <ul>
                                <li>Thay đổi ngôi (I → he/she, we → they, …).</li>
                                <li>
                                    Thay đổi thì của động từ theo nguyên tắc lùi thì (am/is/are → was/were, will →
                                    would, have been → had been, …).
                                </li>
                                <li>
                                    Thay đổi các từ chỉ thời gian, nơi chốn (now → then, today → that day, here → there,
                                    tomorrow → the next day, …).
                                </li>
                            </ul>
                            <p>
                                Ví dụ:
                                <br />
                                - Direct: "I live in London."
                                <br />- Reported: He said (that) he <strong>lived</strong> in London.
                            </p>
                        </div>
                    ) : tabIndex < 4 ? (
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

export default ReportedSpeech;
