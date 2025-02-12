import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../Exercises.module.scss';
import {
    QuestDescription01,
    QuestDescription02,
    QuestDescription03,
    QuestDescription04,
    QuestDescription05,
    QuestDescription06,
    QuestDescription07,
    QuestDescription08,
    QuestDescription09,
    QuestDescription10,
    QuestDescription11,
    QuestDescription12,
    QuestDescription13,
    QuestDescription14,
    QuestDescription15,
    Questions01,
    Questions02,
    Questions03,
    Questions04,
    Questions05,
    Questions06,
    Questions07,
    Questions08,
    Questions09,
    Questions10,
    Questions11,
    Questions12,
    Questions13,
    Questions14,
    Questions15,
} from './exercises_question_description';

const cx = classNames.bind(styles);

const ExerciseQuestions = ({ questions, answers, handleAnswerChange, cx, children }) => {
    return (
        <div className={cx('exercises')}>
            <section className={cx('content-section')}>
                <div className={cx('content-large')}>{children}</div>
                <div className={cx('content-small')}>
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

            <ExerciseQuestions
                questions={Questions05}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription05 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions06}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription06 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions07}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription07 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions08}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription08 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions09}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription09 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions10}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription10 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions11}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription11 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions12}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription12 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions13}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription13 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions14}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription14 />
            </ExerciseQuestions>

            <ExerciseQuestions
                questions={Questions15}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                cx={cx}
            >
                <QuestDescription15 />
            </ExerciseQuestions>
        </div>
    );
}

export default ExercisesPart2;
