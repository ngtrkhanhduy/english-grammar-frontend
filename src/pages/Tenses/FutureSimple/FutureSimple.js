import React from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

// Future Simple Tense Component
const FutureSimple = () => {
    return (
        <div className={cx('english-grammar')}>
            <h1>Thì Tương Lai Đơn (Future Simple)</h1>
            <p>
                Thì tương lai đơn (Future Simple) dùng để diễn tả một hành động sẽ xảy ra trong tương lai hoặc một sự
                thật hiển nhiên, một dự đoán về tương lai.
            </p>

            <h3>Ví Dụ:</h3>
            <ul>
                <li>She will travel to Paris next year. (Cô ấy sẽ đi Paris vào năm tới.)</li>
                <li>I will call you when I arrive. (Tôi sẽ gọi bạn khi tôi đến.)</li>
                <li>They will graduate in two years. (Họ sẽ tốt nghiệp trong hai năm nữa.)</li>
            </ul>

            <h2>Công thức thì tương lai đơn</h2>

            <h3>1. Câu Khẳng Định:</h3>
            <p>
                <strong>S + will + V (nguyên thể) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>I will visit my grandmother tomorrow. (Tôi sẽ thăm bà tôi vào ngày mai.)</li>
                <li>We will go to the beach next summer. (Chúng tôi sẽ đi biển vào mùa hè tới.)</li>
            </ul>

            <h3>2. Câu Phủ Định:</h3>
            <p>
                <strong>S + will + not + V (nguyên thể) + O</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>I will not attend the meeting tomorrow. (Tôi sẽ không tham dự cuộc họp vào ngày mai.)</li>
                <li>She will not come to the party. (Cô ấy sẽ không đến bữa tiệc.)</li>
            </ul>

            <h3>3. Câu Nghi Vấn:</h3>
            <p>
                <strong>Will + S + V (nguyên thể) + O?</strong>
            </p>
            <p>
                <strong>Ví dụ:</strong>
            </p>
            <ul>
                <li>Will you go to the concert tonight? (Bạn sẽ đi xem buổi hòa nhạc tối nay chứ?)</li>
                <li>Will they finish the project by next week? (Họ sẽ hoàn thành dự án trước tuần tới chứ?)</li>
            </ul>

            <h2>Cách Dùng Thì Tương Lai Đơn:</h2>
            <ul>
                <li>Diễn tả hành động, sự việc sẽ xảy ra trong tương lai.</li>
                <li>Diễn tả một dự đoán về tương lai.</li>
                <li>Diễn tả những quyết định, lời hứa, sự đồng ý hoặc từ chối trong tương lai.</li>
            </ul>

            <h2>Dấu Hiệu Nhận Biết Thì Tương Lai Đơn:</h2>
            <ul>
                <li>Tomorrow, next, soon, in a week/month/year, etc.</li>
            </ul>

            <h2>Quy Tắc Chia Động Từ:</h2>
            <ul>
                <li>Động từ "will" không thay đổi bất kỳ hình thức nào, cho dù chủ ngữ là ai.</li>
                <li>Động từ chính không cần thay đổi, luôn ở dạng nguyên thể (không có "to").</li>
                <li>
                    Trong câu phủ định và câu nghi vấn, sử dụng "not" giữa "will" và động từ chính, hoặc đảo "will"
                    trong câu nghi vấn.
                </li>
            </ul>
        </div>
    );
};

export default FutureSimple;
