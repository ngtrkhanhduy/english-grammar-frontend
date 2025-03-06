import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Cookies from 'js-cookie';
import { get, post } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

function Sidebar() {
    const [learningProcess, setLearningProcess] = useState([]);

    useEffect(() => {
        const fetchLearningProcess = async () => {
            try {
                // Get the username from the cookies
                const username = Cookies.get('username');
                if (!username) {
                    throw new Error('Username not found in cookies');
                }

                // Try to fetch the learning process for the user
                const data = await get(`/user-learning-process/${username}`);

                // If the learning process is found, set it to the state
                if (data.learningProcess) {
                    setLearningProcess(data.learningProcess);
                } else {
                    throw new Error('User not found');
                }
            } catch (error) {
                console.error('Error fetching learning process:', error);
                // Use the username from cookies for the fallback
                const username = Cookies.get('username');
                const fallbackData = {
                    username,
                    learningProcess: [
                        { title: 'Bài 1: Thì hiện tại đơn', to: '/present-simple', completed: false },
                        { title: 'Bài 2: Thì hiện tại tiếp diễn', to: '/present-continuous', completed: false },
                        { title: 'Bài 3: Thì hiện tại hoàn thành', to: '/present-perfect', completed: false },
                        {
                            title: 'Bài 4: Thì hiện tại hoàn thành tiếp diễn',
                            to: '/present-perfect-continuous',
                            completed: false,
                        },
                        { title: 'Bài 5: Thì quá khứ đơn', to: '/past-simple', completed: false },
                        { title: 'Bài 6: Thì quá khứ tiếp diễn', to: '/past-continuous', completed: false },
                        { title: 'Bài 7: Thì quá khứ hoàn thành', to: '/past-perfect', completed: false },
                        {
                            title: 'Bài 8: Thì quá khứ hoàn thành tiếp diễn',
                            to: '/past-perfect-continuous',
                            completed: false,
                        },
                        { title: 'Bài 9: Thì tương lai đơn', to: '/future-simple', completed: false },
                        { title: 'Bài 10: Thì tương lai tiếp diễn', to: '/future-continuous', completed: false },
                        { title: 'Bài 11: Thì tương lai hoàn thành', to: '/future-perfect', completed: false },
                        {
                            title: 'Bài 12: Thì tương lai hoàn thành tiếp diễn',
                            to: '/future-perfect-continuous',
                            completed: false,
                        },
                        { title: 'Bài 13: Danh từ', to: '/noun', completed: false },
                        { title: 'Bài 14: Động từ', to: '/verb', completed: false },
                        { title: 'Bài 15: Tính từ', to: '/adjective', completed: false },
                        { title: 'Bài 16: Trạng từ', to: '/adverb', completed: false },
                        { title: 'Bài 17: Đại từ', to: '/pronoun', completed: false },
                        { title: 'Bài 18: Giới từ', to: '/preposition', completed: false },
                        { title: 'Bài 19: Liên từ', to: '/conjunction', completed: false },
                        { title: 'Bài 20: Thán từ', to: '/interjection', completed: false },
                        { title: 'Bài 21: Câu hỏi Yes/No', to: '/yes-no-question', completed: false },
                        { title: 'Bài 22: Câu hỏi Wh-', to: '/wh-question', completed: false },
                        { title: 'Bài 23: Câu hỏi đuôi', to: '/tag-question', completed: false },
                        { title: 'Bài 24: Câu hỏi lựa chọn', to: '/choice-question', completed: false },
                        { title: 'Bài 25: Câu hỏi phủ định', to: '/negative-question', completed: false },
                        { title: 'Bài 26: Câu đơn', to: '/simple-sentence', completed: false },
                        { title: 'Bài 27: Câu ghép', to: '/compound-sentence', completed: false },
                        { title: 'Bài 28: Câu phức', to: '/complex-sentence', completed: false },
                        { title: 'Bài 29: Câu ghép phức', to: '/compound-complex-sentence', completed: false },
                        { title: 'Bài 30: Câu điều kiện', to: '/conditional-sentence', completed: false },
                        { title: 'Bài 31: Câu bị động', to: '/passive-sentence', completed: false },
                        { title: 'Bài 32: Câu tường thuật', to: '/reported-speech', completed: false },
                        { title: 'Bài 33: Câu so sánh', to: '/comparative-sentence', completed: false },
                        { title: 'Bài 34: Cụm động từ', to: '/phrasal-verb', completed: false },
                    ],
                };

                // Fallback logic to send the post request
                try {
                    await post('/user-learning-process', fallbackData);
                    setLearningProcess(fallbackData.learningProcess);
                } catch (postError) {
                    console.error('Error sending fallback learning process:', postError);
                }
            }
        };

        fetchLearningProcess();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                {learningProcess.length > 0 &&
                    learningProcess.map((item) => (
                        <MenuItem key={item.to} title={item.title} to={item.to} isCompleted={item.completed} />
                    ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
