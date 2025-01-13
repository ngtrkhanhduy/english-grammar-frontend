import React from 'react';
import styles from '../../Exercises.module.scss';
import classNames from 'classnames/bind';
import { part1Question } from '../Tab';

const cx = classNames.bind(styles);

function ExercisesPart1({ answers, setAnswers }) {
    const questions = part1Question;
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
                            {q.questionNumber}. {q.question}
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
