import React, { useState, useEffect } from 'react';
import styles from '../../Exercises.module.scss';
import classNames from 'classnames/bind';
import { get } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function ExercisesPart1({ answers, setAnswers }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch questions from the API
        const fetchQuestions = async () => {
            try {
                const data = await get('/exercises-question/search?name=questionset001');
                const first30Questions = data[0]?.questions_api.slice(0, 30); // Ensure we only take the first 30 questions
                setQuestions(first30Questions || []);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    return (
        <div className={cx('exercises')}>
            <div>
                {questions.map((q) => (
                    <div key={q.questionNumber} className={cx('question')}>
                        <h3>
                            {q.questionNumber}. {q.question}
                        </h3>
                        {q.options.map((option) => (
                            <div key={option} className={cx('option')}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${q.questionNumber}`}
                                        value={option}
                                        checked={answers[q.questionNumber] === option}
                                        onChange={() => handleAnswerChange(q.questionNumber, option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExercisesPart1;
