import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Tenses.module.scss';
import { put } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

const WhQuestionLesson = () => {
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = ['Tổng quan', 'Bài học', 'Bài tập'];

    const nextTab = () => setTabIndex((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));
    const prevTab = () => setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));

    const exercises = {
        What: [
            {
                rule: '"What" được dùng để hỏi về sự vật, sự việc.',
                examples: ['What is your name?', 'What do you want?'],
            },
        ],
        Where: [
            {
                rule: '"Where" được dùng để hỏi về địa điểm.',
                examples: ['Where do you live?', 'Where is my book?'],
            },
        ],
        Who: [
            {
                rule: '"Who" được dùng để hỏi về người.',
                examples: ['Who is that?', 'Who wrote this book?'],
            },
        ],
        Why: [
            {
                rule: '"Why" được dùng để hỏi về lý do.',
                examples: ['Why are you late?', 'Why do we need this?'],
            },
        ],
        How: [
            {
                rule: '"How" được dùng để hỏi về cách thức hoặc trạng thái.',
                examples: ['How do you do this?', 'How are you today?'],
            },
        ],
    };

    const questions = [
        {
            id: 1,
            type: 'single',
            question: 'Which sentence is a Wh- question?',
            options: ['Do you like pizza?', 'What is your favorite food?'],
            correctAnswer: 'What is your favorite food?',
        },
        {
            id: 2,
            type: 'single',
            question: 'Which word is a Wh- question word?',
            options: ['Can', 'Where'],
            correctAnswer: 'Where',
        },
        {
            id: 3,
            type: 'fill-in',
            question: 'Complete the sentence: ____ is your favorite color?',
            correctAnswer: 'What',
        },
        {
            id: 4,
            type: 'multiple',
            question: 'Which of these are Wh- question words?',
            options: ['What', 'How', 'Maybe', 'When'],
            correctAnswer: ['What', 'How', 'When'],
        },
        {
            id: 5,
            type: 'true-false',
            question: 'True or False: "Why" is used to ask about a place.',
            correctAnswer: 'false',
        },
        {
            id: 6,
            type: 'order',
            question: 'Arrange the words to make a Wh- question: "you / do / how / do / this?"',
            correctAnswer: 'How do you do this?',
        },
        {
            id: 7,
            type: 'single',
            question: 'Which sentence asks for a reason?',
            options: ['Why are you crying?', 'Where is the book?'],
            correctAnswer: 'Why are you crying?',
        },
        {
            id: 8,
            type: 'multiple',
            question: 'Which of these sentences are questions asking for details?',
            options: ['Where do you live?', 'Do you like coffee?'],
            correctAnswer: ['Where do you live?'],
        },
        {
            id: 9,
            type: 'fill-in',
            question: 'Complete the sentence: ____ are you feeling today?',
            correctAnswer: 'How',
        },
        {
            id: 10,
            type: 'true-false',
            question: 'True or False: "Who" is used to ask about time.',
            correctAnswer: 'false',
        },
    ];

    const handleInputChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        setResults(null);
    };

    const handleCheckAnswers = async () => {
        const evaluatedResults = questions.map((q) =>
            Array.isArray(answers[q.id])
                ? JSON.stringify(answers[q.id]) === JSON.stringify(q.correctAnswer)
                : answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase(),
        );
        const username = Cookies.get('username');
        const path = 'wh-question';
        setResults(evaluatedResults);

        if (evaluatedResults.every((result) => result === true)) {
            try {
                const response = await put(`/user-learning-process/${username}/${path}`, { completed: true });
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
        window.location.reload();
    };

    return (
        <div>
            <h1>Bài học về Câu hỏi Wh-</h1>
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
                        <div>
                            <h3>Tổng quan về Câu hỏi Wh-</h3>
                            <p>
                                Câu hỏi Wh- được sử dụng để hỏi thông tin chi tiết thay vì chỉ nhận câu trả lời "Yes"
                                hoặc "No". Những từ hỏi như "What", "Where", "Who", "Why", "How" thường được sử dụng
                                trong câu hỏi Wh-.
                            </p>
                        </div>
                    ) : tabIndex === 1 ? (
                        <div>
                            <h3>Bài học về Câu hỏi Wh-</h3>
                            <p>Chúng ta sẽ học về cách sử dụng các từ hỏi Wh-: What, Where, Who, Why, How.</p>
                            {Object.keys(exercises).map((key) => (
                                <div key={key} className={cx('rule-container')}>
                                    <h4>{key}</h4>
                                    {exercises[key].map((item, i) => (
                                        <div key={i}>
                                            <p>
                                                <strong>Định nghĩa:</strong>
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
                            ))}
                        </div>
                    ) : (
                        <div>
                            {questions.map((q, index) => (
                                <div key={q.id} className={cx('question')}>
                                    <p>
                                        <strong>{index + 1}. </strong>
                                        {q.question}
                                    </p>
                                    {q.type === 'single' || q.type === 'multiple' ? (
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
                                    ) : q.type === 'fill-in' ? (
                                        <input
                                            type="text"
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        />
                                    ) : q.type === 'order' ? (
                                        <input
                                            type="text"
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        />
                                    ) : q.type === 'true-false' ? (
                                        <select
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            value={answers[q.id] || ''}
                                            disabled={results !== null}
                                        >
                                            <option value="">--Chọn đúng/sai--</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    ) : null}

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

export default WhQuestionLesson;
