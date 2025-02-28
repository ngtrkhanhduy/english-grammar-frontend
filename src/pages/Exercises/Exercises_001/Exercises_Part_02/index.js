import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../Exercises.module.scss';
import {
    QuestDescription01,
    QuestDescription02,
    QuestDescription03,
    QuestDescription04,
} from './exercises_question_description';
import { get } from '~/utils/httpRequest';

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
    const [questions, setQuestions] = useState([]);

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await get('/exercises-question/search?name=questionset001');
                const selectedQuestions = data[0]?.questions_api.slice(30, 46); // Get questions 31-46 (index 30 to 45)
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

    const Questions01 = filterQuestionsByNumber(questions, [31, 32, 33, 34]);
    const Questions02 = filterQuestionsByNumber(questions, [35, 36, 37, 38]);
    const Questions03 = filterQuestionsByNumber(questions, [39, 40, 41, 42]);
    const Questions04 = filterQuestionsByNumber(questions, [43, 44, 45, 46]);

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
