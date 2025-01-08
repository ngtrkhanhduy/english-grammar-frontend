import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';
import { questions_01_02, question_description_01_02 } from './exercises_question';

const cx = classNames.bind(styles);
const questions = questions_01_02;
const formatEmailContent = (text) => {
    return text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

export const filterQuestionsByNumber = (questions, numbers) => {
    return questions.filter((question) => numbers.includes(Number(question.questionNumber)));
};

const ExerciseQuestions = ({ questions_01, answers, handleAnswerChange, formatEmailContent, cx }) => {
    return (
        <div className={cx('exercises')}>
            <section className={cx('content-section')}>
                <div className={cx('content-large')}>{formatEmailContent(questions_01.description)}</div>
                <div className={cx('content-small')}>
                    {questions_01.question.map((q) => (
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

// Ví dụ sử dụng
const questionNumbersToFilter_01 = [31, 32, 33, 34];
const questionNumbersToFilter_02 = [35, 36, 37, 38];
const questionNumbersToFilter_03 = [39, 40, 41, 42];
const questionNumbersToFilter_04 = [43, 44, 45, 46];

const questions_01 = {
    question: filterQuestionsByNumber(questions, questionNumbersToFilter_01),
    description: question_description_01_02[0].description,
};
const questions_02 = {
    question: filterQuestionsByNumber(questions, questionNumbersToFilter_02),
    description: question_description_01_02[1].description,
};
const questions_03 = {
    question: filterQuestionsByNumber(questions, questionNumbersToFilter_03),
    description: question_description_01_02[2].description,
};
const questions_04 = {
    question: filterQuestionsByNumber(questions, questionNumbersToFilter_04),
    description: question_description_01_02[3].description,
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
                questions_01={questions_01}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                formatEmailContent={formatEmailContent}
                cx={cx}
            />
            <ExerciseQuestions
                questions_01={questions_02}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                formatEmailContent={formatEmailContent}
                cx={cx}
            />
            <ExerciseQuestions
                questions_01={questions_03}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                formatEmailContent={formatEmailContent}
                cx={cx}
            />
            <ExerciseQuestions
                questions_01={questions_04}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                formatEmailContent={formatEmailContent}
                cx={cx}
            />
        </div>
    );
}

export default ExercisesPart2;
