import React, { useState } from 'react';
import ExercisesPart1 from './Exercises_Part_01';
import ExercisesPart2 from './Exercises_Part_02';
import ExercisesPart3 from './Exercises_Part_03';
import Tab from './Tab';
import Button from '~/components/Button';
import { post } from '~/utils/httpRequest';
import Cookies from 'js-cookie';
import Grid from '../Grid';
import ConfirmPopup from '../ConfirmPopup';
import styles from '.././Exercises.module.scss'; // Import your SCSS

function ToiecExercises() {
    const [answers, setAnswers] = useState({});
    const [currentPart, setCurrentPart] = useState('Part 1');
    const [showSubmitPopup, setShowSubmitPopup] = useState(false); // State for the submit confirmation
    const [showResultPopup, setShowResultPopup] = useState(false); // State for the result popup
    const [score, setScore] = useState(0); // State to store score

    function handleSubmit() {
        const username = Cookies.get('username');
        const payload = {
            exercises_process_name: 'questionset001',
            username: `${username}`,
            answer: answers,
        };

        post('/user-exercises-process', payload)
            .then((data) => {
                console.log('Response:', data);
                const score = (data.result / data.count) * 100; // Calculate the score percentage
                setScore(score); // Set score in state
                setShowResultPopup(true); // Show the result popup
                setShowSubmitPopup(false); // Hide the submit confirmation
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Submission failed. Please try again.');
            });
    }

    const handleConfirmSubmit = () => {
        // Proceed with the submission when "OK" is pressed
        setShowSubmitPopup(false); // Hide the submit confirmation popup
        handleSubmit(); // Call the submit function
    };

    const handleCancelSubmit = () => {
        setShowSubmitPopup(false); // Hide the submit confirmation popup when "Cancel" is pressed
    };

    const handleConfirmResult = () => {
        // Redirect to the specified page when "OK" is pressed after result popup
        window.location.href = '/toiec-exercises-001';
    };

    const handleCancelResult = () => {
        setShowResultPopup(false); // Hide the result popup if "Cancel" is pressed
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <Tab setCurrentPart={setCurrentPart} />
                {currentPart === 'Part 1' && <ExercisesPart1 answers={answers} setAnswers={setAnswers} />}
                {currentPart === 'Part 2' && <ExercisesPart2 answers={answers} setAnswers={setAnswers} />}
                {currentPart === 'Part 3' && <ExercisesPart3 answers={answers} setAnswers={setAnswers} />}
                <Button primary onClick={() => setShowSubmitPopup(true)}>
                    Submit
                </Button>
            </div>
            <div className={styles.gridContainer}>
                <Grid answers={answers} setAnswers={setAnswers} />
            </div>

            {/* Show the custom popup to confirm submission */}
            {showSubmitPopup && (
                <ConfirmPopup
                    message="Are you sure you want to submit your answers?"
                    onConfirm={handleConfirmSubmit}
                    onCancel={handleCancelSubmit}
                />
            )}

            {/* Show the custom result popup after submission */}
            {showResultPopup && (
                <ConfirmPopup
                    message={`Congratulations! You completed the quiz with a score of ${score.toFixed(2)}%.`}
                    onConfirm={handleConfirmResult}
                    onCancel={handleCancelResult}
                />
            )}
        </div>
    );
}

export default ToiecExercises;
