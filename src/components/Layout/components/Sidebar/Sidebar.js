import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Cookies from 'js-cookie';
import { get } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Sidebar() {
    const [learningProcess, setLearningProcess] = useState([]);

    useEffect(() => {
        const fetchLearningProcess = async () => {
            try {
                const username = Cookies.get('username');
                const data = await get(`/user-learning-process/${username}`);
                setLearningProcess(data.learningProcess);
            } catch (error) {
                console.error('Error fetching learning process:', error);
            }
        };

        fetchLearningProcess();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {learningProcess.length > 0 &&
                    learningProcess.map((item) => (
                        <MenuItem
                            key={item._id}
                            title={item.title}
                            to={item.to}
                            isCompleted={item.completed} // Ensure correct prop name
                        />
                    ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
