import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Simple Present Tense Component
const SimplePresent = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Hiện Tại Đơn (Present Simple)</h1>
            <p>
                Thì hiện tại đơn (Simple Present) dùng để diễn tả một sự việc, hành động diễn ra ở thời điểm hiện tại,
                một thói quen lặp đi lặp lại hoặc một chân lý, sự thật hiển nhiên.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>Water boils at 100 degrees Celsius. (Nước sôi ở 100 độ C.)</li>
                <li>He goes to school by bus. (Anh ấy đi học bằng xe bus.)</li>
                <li>She likes to read books. (Cô ấy rất thích đọc sách.)</li>
            </ul>

            <h2>Công thức thì hiện tại đơn</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>Động từ to be: S + am/is/are + N/Adj</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
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

            <h2>Cách Dùng Thì Hiện Tại Đơn:</h2>
            <ul>
                <li>Diễn tả một hành động, sự việc lặp đi lặp lại thường xuyên hay một thói quen.</li>
                <li>Diễn tả một chân lý, sự thật hiển nhiên.</li>
                <li>Diễn tả các lịch trình có sẵn hay thời gian biểu cố định.</li>
                <li>Diễn tả những suy nghĩ, cảm xúc, cảm giác của chủ thể trong thời điểm hiện tại.</li>
                <li>Sử dụng trong cấu trúc câu điều kiện loại 1.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Hiện Tại Đơn:</h2>
            <ul>
                <li>Trạng từ chỉ tần suất tương đối (Always, Usually, Never, etc.)</li>
                <li>Trạng từ chỉ tần suất cụ thể (Once/twice a day/week/month/year, etc.)</li>
                <li>Trạng từ chỉ sự lặp đi lặp lại (Every day, every week, etc.)</li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Thêm "s" vào sau hầu hết các động từ thường.</li>
                <li>Thêm "es" vào sau động từ có tận cùng là s, ss, sh, ch, z và x.</li>
                <li>Động từ “have” khi đi với chủ ngữ là ngôi thứ 3 số ít sẽ biến thành “has”.</li>
            </ul>
        </div>
    );
};

export default SimplePresent;
