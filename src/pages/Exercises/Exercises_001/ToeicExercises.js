import React, { useState } from 'react';
import ExercisesPart1 from './Exercises_Part_01';
import ExercisesPart2 from './Exercises_Part_02';
import ExercisesPart3 from './Exercises_Part_03';
import Tab from './Tab';
import Button from '~/components/Button';
import { post } from '~/utils/httpRequest';
import Cookies from 'js-cookie';
import Grid from '../Grid';
import styles from '.././Exercises.module.scss'; // Import your SCSS

function ToiecExercises() {
    const [answers, setAnswers] = useState({}); // This stores the answers
    const [currentPart, setCurrentPart] = useState('Part 1');

    function handleSubmit() {
        const username = Cookies.get('username');
        const payload = {
            exercises_process_name: 'questionset001',
            username: `${username}`,
            answer: answers, // Send updated answers to the server
        };

        post('/user-exercises-process', payload)
            .then((data) => {
                console.log('Response:', data);
                const score = (data.result / data.count) * 100; // Calculate the score percentage

                // Display a congratulatory popup with the score
                const message = `Congratulations! You completed the quiz with a score of ${score.toFixed(2)}%.`;

                if (window.confirm(message)) {
                    // Redirect to the specified page when "OK" is pressed
                    window.location.href = '/toiec-exercises-001';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Submission failed. Please try again.');
            });
    }

    return (
        <div className={styles.container}>
            {' '}
            {/* Wrapper for layout */}
            <div className={styles.mainContent}>
                {' '}
                {/* This can hold the exercises */}
                <Tab setCurrentPart={setCurrentPart} />
                {currentPart === 'Part 1' && <ExercisesPart1 answers={answers} setAnswers={setAnswers} />}
                {currentPart === 'Part 2' && <ExercisesPart2 answers={answers} setAnswers={setAnswers} />}
                {currentPart === 'Part 3' && <ExercisesPart3 answers={answers} setAnswers={setAnswers} />}
                <Button primary onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <div className={styles.gridContainer}>
                {' '}
                {/* Grid section */}
                <Grid answers={answers} setAnswers={setAnswers} />
            </div>
        </div>
    );
}

export default ToiecExercises;
