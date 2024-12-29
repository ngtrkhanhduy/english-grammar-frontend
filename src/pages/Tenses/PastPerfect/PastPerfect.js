import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Past Perfect Tense Component
const PastPerfect = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Quá Khứ Hoàn Thành (Past Perfect)</h1>
            <p>
                Thì quá khứ hoàn thành (Past Perfect) dùng để diễn tả một hành động đã xảy ra và hoàn tất trước một hành
                động hoặc sự kiện khác trong quá khứ.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>
                    She had finished her homework before she went to bed. (Cô ấy đã hoàn thành bài tập trước khi đi
                    ngủ.)
                </li>
                <li>They had already left when I arrived. (Họ đã rời đi khi tôi đến.)</li>
                <li>
                    He had never seen such a beautiful view before. (Anh ấy chưa bao giờ thấy một cảnh đẹp như vậy trước
                    đây.)
                </li>
            </ul>

            <h2>Công thức thì quá khứ hoàn thành</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + had + V(3) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>They had left the house when I arrived. (Họ đã rời khỏi nhà khi tôi đến.)</li>
                <li>
                    I had never been to Paris before my trip last year. (Tôi chưa bao giờ đến Paris trước chuyến đi của
                    tôi năm ngoái.)
                </li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + had + not + V(3) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>She had not seen him for years. (Cô ấy đã không gặp anh ta trong nhiều năm.)</li>
                <li>I had not finished my meal when the phone rang. (Tôi chưa ăn xong khi điện thoại đổ chuông.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Had + S + V(3) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>
                    Had you finished your work before you left? (Bạn đã hoàn thành công việc trước khi rời đi chưa?)
                </li>
                <li>
                    Had they heard the news before they saw it on TV? (Họ đã nghe tin trước khi thấy nó trên TV chưa?)
                </li>
            </ul>

            <h2>Cách Dùng Thì Quá Khứ Hoàn Thành:</h2>
            <ul>
                <li>Diễn tả hành động đã hoàn thành trước một thời điểm hoặc sự kiện khác trong quá khứ.</li>
                <li>Diễn tả hành động xảy ra trước một hành động khác trong quá khứ.</li>
                <li>Nhấn mạnh hành động nào xảy ra trước trong quá khứ khi có hai hành động cùng xảy ra.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Quá Khứ Hoàn Thành:</h2>
            <ul>
                <li>
                    Thường đi kèm với các trạng từ chỉ thời gian như: already, just, never, before, after, by the time,
                    by then, etc.
                </li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Động từ chính trong quá khứ hoàn thành là động từ ở dạng phân từ quá khứ (V3).</li>
                <li>Động từ "have" chia ở quá khứ là "had" cho tất cả các ngôi.</li>
                <li>
                    Trong câu phủ định và câu nghi vấn, thêm "not" vào giữa "had" và động từ (hoặc đảo "had" trong câu
                    nghi vấn).
                </li>
            </ul>
        </div>
    );
};

export default PastPerfect;
