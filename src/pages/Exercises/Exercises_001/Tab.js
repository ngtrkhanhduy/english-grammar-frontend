import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Exercises.module.scss';

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
