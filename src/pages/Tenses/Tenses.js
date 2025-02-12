import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

const TenseOverview = () => {
    const tenses = [
        {
            name: 'Present Simple',
            description: 'Used to describe habits, general truths, and regular actions.',
            usage: [
                'Habits or regular actions (e.g., She walks to school every day.)',
                'General truths (e.g., The sun rises in the east.)',
                'Schedules or timetables (e.g., The train leaves at 6 PM.)',
            ],
            examples: [
                'He plays football on weekends.',
                'Water boils at 100 degrees Celsius.',
                'The bus arrives at 8 AM.',
            ],
            structure: {
                affirmative: 'Subject + base verb (+s/es) + Object',
                negative: 'Subject + do/does not + base verb + Object',
                interrogative: 'Do/Does + Subject + base verb + Object?',
            },
        },
        {
            name: 'Past Simple',
            description: 'Used to describe completed actions in the past.',
            usage: [
                'Actions that occurred in the past (e.g., She visited Paris last year.)',
                'A sequence of events in the past (e.g., He entered the room and sat down.)',
            ],
            examples: [
                'I watched a movie yesterday.',
                'He called me last night.',
                'They finished their homework before dinner.',
            ],
            structure: {
                affirmative: 'Subject + past verb + Object',
                negative: 'Subject + did not + base verb + Object',
                interrogative: 'Did + Subject + base verb + Object?',
            },
        },
        {
            name: 'Future Simple',
            description: 'Used to describe actions that will happen in the future.',
            usage: [
                'Actions decided at the moment of speaking (e.g., I will call you later.)',
                'Predictions about the future (e.g., It will rain tomorrow.)',
            ],
            examples: [
                'She will visit her grandmother tomorrow.',
                'We will attend the meeting next week.',
                'He will buy a new car soon.',
            ],
            structure: {
                affirmative: 'Subject + will + base verb + Object',
                negative: 'Subject + will not + base verb + Object',
                interrogative: 'Will + Subject + base verb + Object?',
            },
        },
    ];

    return (
        <div className={cx('english-grammar')}>
            {tenses.map((tense, index) => (
                <div key={index} className={cx('tense-card')}>
                    <h1>{tense.name}</h1>
                    <p>{tense.description}</p>

                    <h3>Usage:</h3>
                    <ul>
                        {tense.usage.map((use, i) => (
                            <li key={i}>{use}</li>
                        ))}
                    </ul>

                    <h3>Examples:</h3>
                    <ul>
                        {tense.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                        ))}
                    </ul>

                    <h3>Structure:</h3>
                    <p>
                        <strong>Affirmative:</strong> {tense.structure.affirmative}
                    </p>
                    <p>
                        <strong>Negative:</strong> {tense.structure.negative}
                    </p>
                    <p>
                        <strong>Interrogative:</strong> {tense.structure.interrogative}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TenseOverview;
