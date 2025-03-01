import React, { useState } from 'react';

import ExercisesPart1 from './Exercises_Part_01';
import ExercisesPart2 from './Exercises_Part_02';
import ExercisesPart3 from './Exercises_Part_03';
import Tab from './Tab';
import Button from '~/components/Button';
import { post } from '~/utils/httpRequest';
import Cookies from 'js-cookie';

function ToiecExercises() {
    const [answers, setAnswers] = useState({});
    const [currentPart, setCurrentPart] = useState('Part 1');

    function handleSubmit() {
        const username = Cookies.get('username');
        const payload = {
            exercises_process_name: 'questionset001',
            username: `${username}`,
            answer: answers,
            result: Object.keys(answers).length, // Số câu đã trả lời
        };

        post('/user-exercises-process', payload)
            .then((data) => {
                console.log('Response:', data);
                alert('Your answers have been submitted successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Submission failed. Please try again.');
            });
        window.location.href = '/toiec-exercises-001';
    }

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
