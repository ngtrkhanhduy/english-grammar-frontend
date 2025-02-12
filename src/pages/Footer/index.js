import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className={cx('footer-column')}>
                    <div className={cx('logo-section')}>
                        <img src="/path-to-logo.png" alt="Company Logo" className={cx('logo')} />
                        <h4>Company Name</h4>
                        <p>&copy; {currentYear} Company Name. All rights reserved.</p>
                    </div>
                </div>

                <div className={cx('footer-column')}>
                    <div className={cx('contact-section')}>
                        <h4>Contact Information</h4>
                        <p>Address: 123 Main Street, City, Country</p>
                        <p>Email: contact@company.com</p>
                        <p>Phone: +123 456 7890</p>
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
