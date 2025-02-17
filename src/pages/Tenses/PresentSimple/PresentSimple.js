import React from 'react';
import classNames from 'classnames/bind';
import PresentSimpleExercise from './PresentSimpleExercise';

const cx = classNames.bind({});

// Simple Present Tense Component
const SimplePresent = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Hiện Tại Đơn (Present Simple)</h1>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>Động từ to be:</strong>
                <div className={cx('content-tenses')}>
                    <p>S + am/is/are + N/Adj</p>
                </div>
            </p>
            <p>
                <p>Ví dụ:</p>
            </p>
            <ul>
                <li>She is beautiful. (Cô ấy rất đẹp.)</li>
                <li>This book is very interesting. (Cuốn sách này rất thú vị.)</li>
            </ul>

            <p>
                <strong>Động từ thường: S + V(s,es) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>He plays the guitar in his free time. (Anh ấy chơi guitar vào thời gian rảnh rỗi.)</li>
                <li>The movie starts at 7 PM. (Bộ phim bắt đầu vào lúc 7 giờ tối.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>Động từ to be: S + am/is/are + not + N/Adj</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>I am not a teacher. (Tôi không phải là một giáo viên.)</li>
                <li>She isn't tall. (Cô ấy không cao.)</li>
            </ul>

            <p>
                <strong>Động từ thường: S + do/does + not + V (nguyên thể) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>He doesn't play the guitar. (Anh ấy không chơi guitar.)</li>
                <li>She doesn't go to school by bike. (Cô ấy không đi học bằng xe đạp.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Động từ to be: Am/is/are (not) + S + N/Adj?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Are they from Vietnam? (Họ có đến từ Việt Nam không?)</li>
            </ul>

            <p>
                <strong>Động từ thường: Do/does + S + V(nguyên thể) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Do you like to watch movies? (Bạn có thích xem phim không?)</li>
            </ul>
            <PresentSimpleExercise />
        </div>
    );
};

export default SimplePresent;
