import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Future Perfect Tense Component
const FuturePerfect = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Tương Lai Hoàn Thành (Future Perfect)</h1>
            <p>
                Thì tương lai hoàn thành (Future Perfect) diễn tả một hành động sẽ hoàn thành trước một thời điểm trong
                tương lai. Hành động này có thể xảy ra trước một thời gian, mốc thời gian hoặc sự kiện khác trong tương
                lai.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>
                    By next year, I will have finished my studies. (Vào năm tới, tôi sẽ hoàn thành việc học của mình.)
                </li>
                <li>She will have left by the time we arrive. (Cô ấy sẽ đã rời đi khi chúng ta đến.)</li>
                <li>They will have built the house by next summer. (Họ sẽ đã xây xong ngôi nhà vào mùa hè tới.)</li>
            </ul>

            <h2>Công thức thì tương lai hoàn thành</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + will + have + V3 (past participle) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>By next month, I will have completed the project. (Vào tháng tới, tôi sẽ hoàn thành dự án.)</li>
                <li>
                    We will have finished the test by 9 AM. (Chúng ta sẽ đã hoàn thành bài kiểm tra trước 9 giờ sáng.)
                </li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + will + not + have + V3 (past participle) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>
                    She will not have finished the work by the deadline. (Cô ấy sẽ không hoàn thành công việc trước hạn
                    chót.)
                </li>
                <li>They will not have left by the time we arrive. (Họ sẽ không rời đi khi chúng ta đến.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Will + S + have + V3 (past participle) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Will you have finished the report by tomorrow? (Bạn sẽ hoàn thành báo cáo trước ngày mai chứ?)</li>
                <li>Will they have left by the time we arrive? (Họ sẽ rời đi khi chúng ta đến chứ?)</li>
            </ul>

            <h2>Cách Dùng Thì Tương Lai Hoàn Thành:</h2>
            <ul>
                <li>Diễn tả hành động sẽ hoàn thành trước một thời điểm trong tương lai.</li>
                <li>Diễn tả hành động sẽ hoàn thành trước một mốc thời gian hay một sự kiện khác trong tương lai.</li>
                <li>
                    Diễn tả một hành động đã hoàn thành vào một thời điểm trong tương lai, nhưng có thể không rõ ràng
                    khi hành động đó sẽ hoàn thành.
                </li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Tương Lai Hoàn Thành:</h2>
            <ul>
                <li>By + mốc thời gian trong tương lai (e.g., by next year, by 10 PM, by the time we arrive, etc.)</li>
                <li>
                    Before + mốc thời gian hoặc sự kiện trong tương lai (e.g., before the meeting, before summer, etc.)
                </li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Động từ "will" không thay đổi với tất cả các chủ ngữ.</li>
                <li>Sau "will," dùng "have," tiếp theo là động từ ở dạng V3 (quá khứ phân từ).</li>
                <li>Để tạo câu phủ định, thêm "not" sau "will." Để tạo câu hỏi, đảo "will" và chủ ngữ.</li>
            </ul>
        </div>
    );
};

export default FuturePerfect;
