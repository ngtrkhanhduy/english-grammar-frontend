import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Exercises.module.scss';

const cx = classNames.bind(styles);

const Grid = ({ answers, setAnswers }) => {
    const allQuestions = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        const completedQuestions = Object.keys(answers).filter((questionId) => answers[questionId] !== null);
        setCompleted(completedQuestions);
    }, [answers]);

    return (
        <div className={cx('grid-container')}>
            {allQuestions.map((questionId) => (
                <div
                    key={questionId}
                    className={cx('cell', {
                        completed: completed.includes(questionId),
                    })}
                >
                    {questionId}
                </div>
            ))}
        </div>
    );
};

export default Grid;
