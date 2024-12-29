import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Past Continuous Tense Component
const PastContinuous = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Quá Khứ Tiếp Diễn (Past Continuous)</h1>
            <p>
                Thì quá khứ tiếp diễn (Past Continuous) dùng để diễn tả hành động đang xảy ra tại một thời điểm cụ thể
                trong quá khứ hoặc hành động đang diễn ra thì có một hành động khác xen vào.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>I was reading a book when she called me. (Tôi đang đọc sách khi cô ấy gọi tôi.)</li>
                <li>
                    They were playing football at 5 PM yesterday. (Họ đang chơi bóng đá vào lúc 5 giờ chiều ngày hôm
                    qua.)
                </li>
                <li>He was watching TV when the phone rang. (Anh ấy đang xem TV khi điện thoại reo.)</li>
            </ul>

            <h2>Công thức thì quá khứ tiếp diễn</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + was/were + V-ing + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>She was studying at 8 PM last night. (Cô ấy đang học vào lúc 8 giờ tối qua.)</li>
                <li>They were watching a movie when I arrived. (Họ đang xem phim khi tôi đến.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + was/were + not + V-ing + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>I was not sleeping when you called. (Tôi không đang ngủ khi bạn gọi.)</li>
                <li>They were not working at that time. (Họ không làm việc vào lúc đó.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Was/Were + S + V-ing + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Were you studying when I called? (Bạn đang học khi tôi gọi không?)</li>
                <li>Was she sleeping at 10 PM? (Cô ấy có đang ngủ vào lúc 10 giờ tối không?)</li>
            </ul>

            <h2>Cách Dùng Thì Quá Khứ Tiếp Diễn:</h2>
            <ul>
                <li>Diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ.</li>
                <li>Diễn tả hành động đang xảy ra thì có một hành động khác xen vào.</li>
                <li>Diễn tả hành động, sự việc đang diễn ra liên tục trong một khoảng thời gian dài trong quá khứ.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Quá Khứ Tiếp Diễn:</h2>
            <ul>
                <li>At that time, while, when, as, etc.</li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>
                    Động từ "to be" chia ở quá khứ: "was" cho ngôi thứ nhất số ít (I) và ngôi thứ ba số ít (he, she,
                    it), "were" cho các ngôi còn lại (you, we, they).
                </li>
                <li>Động từ chính ở dạng V-ing.</li>
                <li>
                    Trong câu phủ định và câu nghi vấn, sử dụng "not" giữa "was/were" và động từ V-ing, hoặc đảo
                    "was/were" trong câu nghi vấn.
                </li>
            </ul>
        </div>
    );
};

export default PastContinuous;
