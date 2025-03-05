import images from '~/assets/images';
import classNames from 'classnames/bind';

const cx = classNames.bind({});

function Home() {
    return (
        <div className={cx('english-grammar')}>
            <h1>Chào mừng bạn đến với English Grammar Pro!</h1>
            <p>
                **English Grammar Pro** là nền tảng học ngữ pháp tiếng Anh toàn diện dành cho mọi đối tượng. Dù bạn là
                học sinh, giáo viên hay người muốn cải thiện kỹ năng tiếng Anh, chúng tôi đều có tài liệu phù hợp cho
                bạn. Với các bài học trực quan, bài tập thực hành tương tác và hướng dẫn từ chuyên gia, việc học ngữ
                pháp chưa bao giờ dễ dàng và thú vị đến thế!
            </p>

            <section className={cx('content-section')}>
                <div className={cx('content-large')}>
                    <h2>Tại sao nên chọn English Grammar Pro?</h2>
                    <ul>
                        <li>
                            <strong>📚 Bài học toàn diện</strong>: Hệ thống từ cơ bản đến nâng cao, giúp bạn hiểu sâu
                            ngữ pháp một cách có hệ thống.
                        </li>
                        <li>
                            <strong>🎯 Thực hành tương tác</strong>: Ôn tập kiến thức qua bài kiểm tra, trò chơi và bài
                            tập giúp bạn nắm vững nội dung.
                        </li>
                        <li>
                            <strong>👩‍🏫 Hướng dẫn từ chuyên gia</strong>: Các giáo viên tiếng Anh giàu kinh nghiệm sẽ
                            giải thích chi tiết và đưa ra lời khuyên hữu ích.
                        </li>
                        <li>
                            <strong>💡 Giao diện thân thiện</strong>: Thiết kế trực quan, phù hợp với mọi lứa tuổi và
                            trình độ học tập.
                        </li>
                        <li>
                            <strong>📊 Theo dõi tiến độ</strong>: Hệ thống báo cáo giúp bạn đánh giá sự tiến bộ của bản
                            thân theo từng giai đoạn.
                        </li>
                    </ul>
                </div>
                <div className={cx('content-small')}>
                    <div className={cx('image-container')}>
                        <img src={images.home_index_0} alt="home-index-0" />
                    </div>
                </div>
            </section>

            <section>
                <h2>🌟 Tính năng nổi bật</h2>
                <ul>
                    <li>
                        <strong>🔍 Chủ đề ngữ pháp đa dạng</strong>: Bao gồm thì động từ, dấu câu, các thành phần câu và
                        cách hình thành câu.
                    </li>
                    <li>
                        <strong>📖 Ví dụ thực tế</strong>: Giúp bạn hiểu cách áp dụng ngữ pháp vào giao tiếp hàng ngày.
                    </li>
                    <li>
                        <strong>💬 Cộng đồng học tập</strong>: Tham gia diễn đàn và nhóm thảo luận để giao lưu với người
                        học khác.
                    </li>
                    <li>
                        <strong>🏅 Chứng nhận hoàn thành khóa học</strong>: Nhận chứng chỉ để khẳng định kỹ năng ngữ
                        pháp của bạn.
                    </li>
                </ul>
            </section>

            <section>
                <h2>🎯 Ai có thể hưởng lợi từ English Grammar Pro?</h2>
                <ul>
                    <li>📌 Học sinh ôn luyện các kỳ thi như IELTS, TOEFL, SAT.</li>
                    <li>📌 Người đi làm muốn cải thiện kỹ năng giao tiếp trong công việc.</li>
                    <li>📌 Giáo viên cần tài liệu hỗ trợ giảng dạy.</li>
                    <li>📌 Bất kỳ ai đam mê học và làm chủ ngôn ngữ tiếng Anh.</li>
                </ul>
            </section>

            <section>
                <h2>🚀 Bắt đầu hành trình học tập ngay hôm nay!</h2>
                <p>
                    Đừng để những khó khăn về ngữ pháp cản trở bạn. Hãy **đăng ký miễn phí** ngay hôm nay để nâng cao
                    trình độ tiếng Anh của bạn với **English Grammar Pro**! Cùng nhau, chúng ta sẽ biến ngữ pháp trở
                    thành thế mạnh của bạn! 💪
                </p>
            </section>
        </div>
    );
}

export default Home;
