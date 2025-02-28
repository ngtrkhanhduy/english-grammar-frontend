import React, { useState, useEffect } from 'react';
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
} from './exercises_question_description';
import { get } from '~/utils/httpRequest';

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

function ExercisesPart3({ answers, setAnswers }) {
    const [questions, setQuestions] = useState([]);

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await get('/exercises-question/search?name=questionset001');
                const selectedQuestions = data[0]?.questions_api.slice(46, 100); // Get questions 47-100 (index 46 to 99)
                setQuestions(selectedQuestions || []);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionNumber, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionNumber]: selectedOption,
        }));
    };

    // Filter questions for different sets based on their question numbers
    const filterQuestionsByNumber = (questions, numbers) => {
        return questions.filter((question) => numbers.includes(Number(question.questionNumber)));
    };

    const Questions01 = filterQuestionsByNumber(questions, [47, 48]);
    const Questions02 = filterQuestionsByNumber(questions, [49, 50]);
    const Questions03 = filterQuestionsByNumber(questions, [51, 52]);
    const Questions04 = filterQuestionsByNumber(questions, [53, 54]);
    const Questions05 = filterQuestionsByNumber(questions, [55, 56, 57]);
    const Questions06 = filterQuestionsByNumber(questions, [58, 59, 60]);
    const Questions07 = filterQuestionsByNumber(questions, [61, 62, 63, 64]);
    const Questions08 = filterQuestionsByNumber(questions, [65, 66, 67]);
    const Questions09 = filterQuestionsByNumber(questions, [68, 69, 70, 71]);
    const Questions10 = filterQuestionsByNumber(questions, [72, 73, 74, 75]);
    const Questions11 = filterQuestionsByNumber(questions, [76, 77, 78, 79, 80]);
    const Questions12 = filterQuestionsByNumber(questions, [81, 82, 83, 84, 85]);
    const Questions13 = filterQuestionsByNumber(questions, [86, 87, 88, 89, 90]);
    const Questions14 = filterQuestionsByNumber(questions, [91, 92, 93, 94, 95]);
    const Questions15 = filterQuestionsByNumber(questions, [96, 97, 98, 99, 100]);

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

export default ExercisesPart3;
