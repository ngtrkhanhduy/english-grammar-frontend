import React from 'react';
import styles from '../Exercises.module.scss';
import classNames from 'classnames/bind';
import { questions_01_01 } from './exercises_question';

const cx = classNames.bind(styles);
const questions = questions_01_01;

function ExercisesPart1({ answers, setAnswers }) {
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
                    <div key={q.id} className={cx('question')}>
                        <h3>
                            {q.id}. {q.question}
                        </h3>
                        {q.options.map((option) => (
                            <div key={option.value} className={cx('option')}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={option.value}
                                        checked={answers[q.id] === option.value}
                                        onChange={() => handleAnswerChange(q.id, option.value)}
                                    />
                                    {option.label}
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
