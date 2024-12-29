import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Past Simple Tense Component
const PastSimple = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Quá Khứ Đơn (Past Simple)</h1>
            <p>
                Thì quá khứ đơn (Past Simple) được sử dụng để diễn tả một hành động hoặc sự việc đã xảy ra và hoàn thành
                tại một thời điểm xác định trong quá khứ.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>I visited my grandmother last weekend. (Tôi đã thăm bà vào cuối tuần trước.)</li>
                <li>They traveled to Paris last summer. (Họ đã du lịch đến Paris vào mùa hè năm ngoái.)</li>
                <li>She watched a movie yesterday. (Cô ấy đã xem một bộ phim hôm qua.)</li>
            </ul>

            <h2>Công thức thì quá khứ đơn</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + V2 (quá khứ của động từ) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>He played football yesterday. (Anh ấy đã chơi bóng đá hôm qua.)</li>
                <li>We visited the museum last week. (Chúng tôi đã thăm bảo tàng vào tuần trước.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + did not (didn't) + V (nguyên thể) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>She didn't go to school yesterday. (Cô ấy đã không đi học hôm qua.)</li>
                <li>They didn't like the movie. (Họ không thích bộ phim.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Did + S + V (nguyên thể) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Did you watch the game? (Bạn đã xem trận đấu chưa?)</li>
                <li>Did she call you yesterday? (Cô ấy đã gọi cho bạn hôm qua chưa?)</li>
            </ul>

            <h2>Cách Dùng Thì Quá Khứ Đơn:</h2>
            <ul>
                <li>Diễn tả hành động, sự việc đã xảy ra và hoàn thành trong quá khứ tại một thời điểm xác định.</li>
                <li>Diễn tả các sự kiện trong một câu chuyện hoặc quá trình lịch sử.</li>
                <li>Diễn tả hành động lặp lại trong quá khứ.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Quá Khứ Đơn:</h2>
            <ul>
                <li>
                    Yesterday (hôm qua), last (cuối tuần trước, năm ngoái, tháng trước, v.v.), in (1990, the 18th
                    century), ago (trước đây).
                </li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Động từ thường: Thêm “ed” vào cuối động từ (ví dụ: work -&gt; worked, play -&gt; played).</li>
                <li>
                    Động từ bất quy tắc: Cần học thuộc các động từ bất quy tắc (ví dụ: go -&gt; went, eat -&gt; ate,
                    have -&gt; had).
                </li>
            </ul>
        </div>
    );
};

export default PastSimple;
