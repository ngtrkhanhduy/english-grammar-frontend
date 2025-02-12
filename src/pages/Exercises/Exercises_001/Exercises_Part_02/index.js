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

// Component hiển thị câu hỏi
const ExerciseQuestions = ({ questions, answers, handleAnswerChange, children }) => {
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
    const handleAnswerChange = (questionNumber, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionNumber]: selectedOption,
        }));
    };

    return (
        <div>
            <ExerciseQuestions questions={Questions01} answers={answers} handleAnswerChange={handleAnswerChange}>
                <QuestDescription01 />
            </ExerciseQuestions>
            <ExerciseQuestions questions={Questions02} answers={answers} handleAnswerChange={handleAnswerChange}>
                <QuestDescription02 />
            </ExerciseQuestions>
            <ExerciseQuestions questions={Questions03} answers={answers} handleAnswerChange={handleAnswerChange}>
                <QuestDescription03 />
            </ExerciseQuestions>
            <ExerciseQuestions questions={Questions04} answers={answers} handleAnswerChange={handleAnswerChange}>
                <QuestDescription04 />
            </ExerciseQuestions>
        </div>
    );
}

export default ExercisesPart2;
