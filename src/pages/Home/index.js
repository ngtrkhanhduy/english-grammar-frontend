import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('english-grammar-intro')}>
            <h1>Welcome to English Grammar Pro!</h1>
            <p>
                English Grammar Pro is your ultimate online resource for mastering English grammar. Whether you’re a
                student, a teacher, or someone looking to enhance your English language skills, our platform is designed
                to meet your needs. With interactive lessons, practice exercises, and expert guidance, learning grammar
                has never been easier or more engaging.
            </p>

            <section className={cx('content-section')}>
                <div className={cx('content-large')}>
                    <h2>Why Choose English Grammar Pro?</h2>
                    <ul>
                        <li>
                            <strong>Comprehensive Lessons</strong>: From basic sentence structure to advanced grammar
                            concepts, we cover it all in a structured and easy-to-understand manner.
                        </li>
                        <li>
                            <strong>Interactive Practice</strong>: Test your knowledge with quizzes, games, and
                            exercises that reinforce what you’ve learned.
                        </li>
                        <li>
                            <strong>Expert Guidance</strong>: Get tips and explanations from experienced English
                            teachers and linguists.
                        </li>
                        <li>
                            <strong>User-Friendly Interface</strong>: Our website is intuitive, making it accessible to
                            learners of all ages.
                        </li>
                        <li>
                            <strong>Progress Tracking</strong>: Monitor your improvement over time with detailed
                            reports.
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
                <h2>Features</h2>
                <ul>
                    <li>
                        <strong>Grammar Topics</strong>: Explore topics like tenses, punctuation, parts of speech, and
                        sentence formation.
                    </li>
                    <li>
                        <strong>Real-World Examples</strong>: Learn how grammar applies to everyday English
                        communication.
                    </li>
                    <li>
                        <strong>Community Support</strong>: Join forums and discussion groups to interact with other
                        learners and instructors.
                    </li>
                    <li>
                        <strong>Certification</strong>: Complete courses to earn certificates that validate your grammar
                        skills.
                    </li>
                </ul>
            </section>

            <section>
                <h2>Who Can Benefit?</h2>
                <ul>
                    <li>Students preparing for exams like IELTS, TOEFL, or SAT.</li>
                    <li>Professionals improving their business communication skills.</li>
                    <li>Teachers looking for resources to enhance their teaching methods.</li>
                    <li>Anyone passionate about mastering the English language.</li>
                </ul>
            </section>

            <section>
                <h2>Get Started Today!</h2>
                <p>
                    Don’t let grammar challenges hold you back. Sign up for free and unlock your potential with English
                    Grammar Pro. Together, we’ll make grammar your strength!
                </p>
            </section>
        </div>
    );
}

export default Home;
