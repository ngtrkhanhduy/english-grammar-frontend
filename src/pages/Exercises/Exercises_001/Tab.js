import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';
import { questions_api } from './questions_api';

export const part1Question = questions_api.slice(0, 30);
export const part2Question = questions_api.slice(30, 46);
export const part3Question = questions_api.slice(46);

const cx = classNames.bind(styles);

function Tab({ setCurrentPart }) {
    const [currentTab, setTab] = useState('Part 1');

    const handleTabClick = (part) => {
        setTab(part);
        setCurrentPart(part);
    };

    return (
        <div className={cx('exercises')}>
            <div className={cx('tabs')}>
                {['Part 1', 'Part 2', 'Part 3'].map((part) => (
                    <button
                        key={part}
                        onClick={() => handleTabClick(part)}
                        className={cx({ active: part === currentTab })}
                    >
                        {part}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tab;
