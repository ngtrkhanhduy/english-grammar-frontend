import React, { useState } from 'react';

import ExercisesPart1 from './Exercises_Part_01';
import ExercisesPart2 from './Exercises_Part_02';
import ExercisesPart3 from './Exercises_Part_03';
import Tab from './Tab';
import Button from '~/components/Button';
import { questions_api } from './questions_api';

export const part1Question = questions_api.slice(0, 30);
export const part2Question = questions_api.slice(30, 46);
export const part3Question = questions_api.slice(46);

function ToiecExercises() {
    const [answers, setAnswers] = useState({});
    const [currentPart, setCurrentPart] = useState('Part 1');

    const handleSubmit = () => {
        console.log('User Answers:', answers);
        alert('Your answers have been submitted!');
    };

    return (
        <>
            <Tab setCurrentPart={setCurrentPart} />
            {currentPart === 'Part 1' && <ExercisesPart1 answers={answers} setAnswers={setAnswers} />}
            {currentPart === 'Part 2' && <ExercisesPart2 answers={answers} setAnswers={setAnswers} />}
            {currentPart === 'Part 3' && <ExercisesPart3 answers={answers} setAnswers={setAnswers} />}

            <Button primary onClick={handleSubmit}>
                Submit
            </Button>
        </>
    );
}

export default ToiecExercises;
