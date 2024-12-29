import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Present Perfect Tense Component
const PresentPerfect = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Hiện Tại Hoàn Thành (Present Perfect)</h1>
            <p>
                Thì hiện tại hoàn thành (Present Perfect) được sử dụng để diễn tả hành động đã xảy ra trong quá khứ,
                nhưng có mối liên hệ với hiện tại, hoặc một hành động bắt đầu trong quá khứ và kéo dài đến hiện tại.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>I have lived here for five years. (Tôi đã sống ở đây 5 năm.)</li>
                <li>She has finished her homework. (Cô ấy đã hoàn thành bài tập về nhà.)</li>
                <li>They have visited France several times. (Họ đã đến Pháp vài lần.)</li>
            </ul>

            <h2>Công thức thì hiện tại hoàn thành</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + have/has + V(3) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>I have read that book. (Tôi đã đọc cuốn sách đó.)</li>
                <li>She has completed the project. (Cô ấy đã hoàn thành dự án.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + have/has + not + V(3) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>They have not seen the movie. (Họ chưa xem bộ phim.)</li>
                <li>He hasn't finished his work yet. (Anh ấy chưa hoàn thành công việc của mình.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Have/has + S + V(3) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Have you eaten breakfast? (Bạn đã ăn sáng chưa?)</li>
                <li>Has she visited this museum? (Cô ấy đã thăm bảo tàng này chưa?)</li>
            </ul>

            <h2>Cách Dùng Thì Hiện Tại Hoàn Thành:</h2>
            <ul>
                <li>
                    Diễn tả hành động đã xảy ra trong quá khứ, nhưng không xác định thời gian cụ thể và có mối liên hệ
                    với hiện tại.
                </li>
                <li>Diễn tả hành động đã hoàn thành và kết quả của nó vẫn có ảnh hưởng đến hiện tại.</li>
                <li>Diễn tả hành động bắt đầu từ quá khứ và vẫn tiếp tục đến hiện tại.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Hiện Tại Hoàn Thành:</h2>
            <ul>
                <li>
                    Already (đã), yet (chưa), just (vừa mới), ever (bao giờ), never (không bao giờ), since (kể từ), for
                    (trong khoảng thời gian).
                </li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>
                    Động từ chính chia ở dạng quá khứ phân từ (V(3)) (ví dụ: go -&gt; gone, do -&gt; done, see -&gt;
                    seen).
                </li>
                <li>Đối với chủ ngữ ngôi thứ 3 số ít, sử dụng "has", còn lại dùng "have".</li>
            </ul>
        </div>
    );
};

export default PresentPerfect;
