import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../Exercises.module.scss';
import {
    QuestDescription01,
    QuestDescription02,
    QuestDescription03,
    QuestDescription04,
    Questions01,
    Questions02,
    Questions03,
    Questions04,
} from './exercises_question_description';

const cx = classNames.bind(styles);

const ExerciseQuestions = ({ questions, answers, handleAnswerChange, cx, children }) => {
    return (
        <div className={cx('exercises')}>
            <section className={cx('content-section')}>
                <div className={cx('content-large')}>{children}</div>
                <div className={cx('content-small')}>
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
            </section>
        </div>
    );
};

function ExercisesPart2({ answers, setAnswers }) {
    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    return (
        <div>
            <ExerciseQuestions
                questions={Questions01}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription01 />
            </ExerciseQuestions>
            <ExerciseQuestions
                questions={Questions02}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription02 />
            </ExerciseQuestions>
            <ExerciseQuestions
                questions={Questions03}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription03 />
            </ExerciseQuestions>
            <ExerciseQuestions
                questions={Questions04}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription04 />
            </ExerciseQuestions>
        </div>
    );
}

export default ExercisesPart2;
