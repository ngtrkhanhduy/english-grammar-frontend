import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Present Continuous Tense Component
const PresentContinuous = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Hiện Tại Tiếp Diễn (Present Continuous)</h1>
            <p>
                Thì hiện tại tiếp diễn (Present Continuous) dùng để diễn tả một hành động đang xảy ra tại thời điểm nói,
                hoặc một hành động đang xảy ra xung quanh thời điểm hiện tại.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>She is reading a book right now. (Cô ấy đang đọc một cuốn sách ngay bây giờ.)</li>
                <li>They are playing football at the moment. (Họ đang chơi bóng đá vào lúc này.)</li>
                <li>He is studying for his exam. (Anh ấy đang học cho kỳ thi của mình.)</li>
            </ul>

            <h2>Công thức thì hiện tại tiếp diễn</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>Động từ to be: S + am/is/are + V-ing</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>She is studying right now. (Cô ấy đang học ngay bây giờ.)</li>
                <li>They are working on a new project. (Họ đang làm việc trên một dự án mới.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>Động từ to be: S + am/is/are + not + V-ing</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>He is not coming to the party. (Anh ấy không đến bữa tiệc.)</li>
                <li>They aren't listening to music right now. (Họ không nghe nhạc ngay bây giờ.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Động từ to be: Am/is/are + S + V-ing?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Are you watching TV? (Bạn có đang xem TV không?)</li>
                <li>Is he coming to the meeting? (Anh ấy có đến cuộc họp không?)</li>
            </ul>

            <h2>Cách Dùng Thì Hiện Tại Tiếp Diễn:</h2>
            <ul>
                <li>Diễn tả một hành động đang diễn ra tại thời điểm nói.</li>
                <li>
                    Diễn tả một hành động đang diễn ra xung quanh thời điểm hiện tại (mặc dù không nhất thiết xảy ra
                    ngay lúc nói).
                </li>
                <li>Diễn tả những sự việc tạm thời hoặc có kế hoạch trong tương lai gần.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Hiện Tại Tiếp Diễn:</h2>
            <ul>
                <li>Now (bây giờ), at the moment (vào lúc này), currently (hiện tại).</li>
                <li>Look! (Nhìn kìa!), Listen! (Nghe này!).</li>
                <li>Always (thường xuyên, trong những tình huống không mong muốn hoặc phàn nàn).</li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Thêm "ing" vào động từ (ví dụ: play -&gt; playing, run -&gt; running).</li>
                <li>
                    Động từ có kết thúc bằng "e" thì bỏ "e" trước khi thêm "ing" (ví dụ: make -&gt; making, write -&gt;
                    writing).
                </li>
                <li>
                    Đối với động từ có một âm tiết và kết thúc bằng một phụ âm đơn, ta gấp đôi phụ âm cuối (ví dụ: sit
                    -&gt; sitting, run -`&gt; running).
                </li>
            </ul>
        </div>
    );
};

export default PresentContinuous;
