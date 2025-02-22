import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className={cx('footer-column')}>
                    <div className={cx('logo-section')}>
                        <img src={images.english_grammar_logo} alt="Company Logo" className={cx('logo')} />
                        <p>&copy; {currentYear} EngLish Grammar. All rights reserved.</p>
                    </div>
                </div>

                <div className={cx('footer-column')}>
                    <div className={cx('contact-section')}>
                        <h4>Contact Information</h4>
                        <p>Address: 123 Main Street, HoChiMinh City, Vietnam</p>
                        <p>Email: ngtrkhanhduy1308@email.com</p>
                        <p>Phone: +84 373 476 687</p>
                    </div>
                </div>

                <div className={cx('footer-column')}>
                    <div className={cx('support-section')}>
                        <h4>Customer Support</h4>
                        <ul className={cx('support-links')}>
                            <li>
                                <a href="/help">Help Center</a>
                            </li>
                            <li>
                                <a href="/faq">FAQs</a>
                            </li>
                            <li>
                                <a href="/contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
