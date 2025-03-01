import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const PhrasalVerb = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    // Define the tabs
    const tabs = [
        'Tổng quan',
        'Transitive & Intransitive',
        'Separable & Inseparable',
        'Một số phrasal verb phổ biến',
        'Bài tập',
    ];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // Content for the 3 "detail" tabs (excluding "Tổng quan" and "Bài tập")
    const exercises = {
        'Transitive & Intransitive': [
            {
                rule: `• **Transitive phrasal verbs** cần tân ngữ (object) theo sau.
• **Intransitive phrasal verbs** không cần tân ngữ.`,
                examples: [
                    'Transitive (cần tân ngữ): "Please turn off the TV." → TV là tân ngữ.',
                    'Intransitive (không cần tân ngữ): "He woke up late." → Không có tân ngữ ở đây.',
                ],
            },
        ],
        'Separable & Inseparable': [
            {
                rule: `• **Separable phrasal verbs**: có thể tách rời động từ và tiểu từ khi có tân ngữ.
  (e.g., "turn off the TV" hoặc "turn the TV off")
• **Inseparable phrasal verbs**: không thể tách rời.
  (e.g., "look after the baby" - KHÔNG thể nói "look the baby after")`,
                examples: [
                    'Separable: "I will pick up my friend." hoặc "I will pick my friend up."',
                    'Inseparable: "We ran into an old friend." (Không thể tách "ran" và "into")',
                ],
            },
        ],
        'Một số phrasal verb phổ biến': [
            {
                rule: `Dưới đây là một số phrasal verbs thông dụng:`,
                examples: [
                    '**get up** – thức dậy',
                    '**look after** – chăm sóc',
                    '**find out** – tìm ra, khám phá ra',
                    '**give up** – từ bỏ',
                    '**call off** – hủy bỏ',
                    '**run into** – tình cờ gặp',
                ],
            },
        ],
    };

    // Questions for the "Bài tập" tab
    const questions = [
        // Single choice
        {
            id: 1,
            type: 'single',
            question: `1) "I always ____ early on weekends."`,
            options: ['get up', 'look for'],
            correctAnswer: 'get up',
        },
        // Single choice
        {
            id: 2,
            type: 'single',
            question: `2) "Could you please ____ the TV?"`,
            options: ['turn off', 'go off'],
            correctAnswer: 'turn off',
        },
        // Single choice
        {
            id: 3,
            type: 'single',
            question: `"She doesn't want to ____ smoking."`,
            options: ['look after', 'give up'],
            correctAnswer: 'give up',
        },
        // Fill-in
        {
            id: 4,
            type: 'fill',
            question: `4) "He ____ (ran into / looked after) his ex-girlfriend at the mall yesterday." 
→ Chọn phrasal verb đúng:`,
            correctAnswer: 'ran into',
        },
        {
            id: 5,
            type: 'fill',
            question: `5) "I'll ____ (pick you up / find you out) at 7 PM." 
→ Chọn phrasal verb đúng:`,
            correctAnswer: 'pick you up',
        },
        {
            id: 6,
            type: 'fill',
            question: `6) "She has to ____ (look after / give up) her younger brother this weekend." 
→ Chọn phrasal verb đúng:`,
            correctAnswer: 'look after',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        // Evaluate answers
        const evaluatedResults = questions.map(
            (q) => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim(),
        );

        // For updating user progress in your backend
        const username = Cookies.get('username');
        const path = 'phrasal-verb'; // Adjust as needed for your route

        setResults(evaluatedResults);

        // Check if all answers are correct
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
        // Reload after clicking "OK" in the popup
        window.location.reload();
    };

    return (
        <div>
            <h1>Phrasal Verbs</h1>
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
                        // "Tổng quan" tab
                        <div>
                            <h3>Tổng quan về Phrasal Verbs</h3>
                            <p>
                                <strong>Phrasal verbs</strong> là cụm động từ gồm một động từ chính kết hợp với một hoặc
                                nhiều tiểu từ (particle) như <em>up, off, in, on, after, out</em>… để tạo nghĩa mới.
                                Chúng rất phổ biến trong giao tiếp tiếng Anh thường ngày.
                            </p>
                            <p>
                                Ví dụ:
                                <br />- <em>get up</em>: thức dậy
                                <br />- <em>look after</em>: chăm sóc
                                <br />- <em>pick up</em>: đón, nhặt lên
                            </p>
                            <p>
                                Sẽ có một số quy tắc liên quan đến việc phrasal verbs có thể tách rời (separable) hay
                                không, và có cần tân ngữ (object) hay không. Hãy cùng tìm hiểu chi tiết ở các mục bên
                                dưới.
                            </p>
                        </div>
                    ) : tabIndex < 4 ? (
                        // "Transitive & Intransitive", "Separable & Inseparable", "Một số phrasal verb phổ biến"
                        <div>
                            <h3>{tabs[tabIndex]}</h3>
                            {exercises[tabs[tabIndex]]?.map((item, i) => (
                                <div key={i} className={cx('rule-container')}>
                                    <p>
                                        <strong>Khái niệm / Công thức:</strong>
                                    </p>
                                    <div className={cx('rule')} dangerouslySetInnerHTML={{ __html: item.rule }}></div>
                                    <p>
                                        <strong>Ví dụ:</strong>
                                    </p>
                                    {item.examples.map((ex, idx) => (
                                        <p key={idx} dangerouslySetInnerHTML={{ __html: ex }}></p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // "Bài tập" tab
                        <div>
                            {questions.map((q, index) => (
                                <div key={q.id} className={cx('question')}>
                                    <p dangerouslySetInnerHTML={{ __html: q.question }}></p>
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

export default PhrasalVerb;
