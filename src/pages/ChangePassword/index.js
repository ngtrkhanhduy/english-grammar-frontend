import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import Button from '~/components/Button';
import Cookies from 'js-cookie';
import { post } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        setShowConfirmPopup(true);
    };

    const confirmChangePassword = () => {
        const username = Cookies.get('username');
        if (!username) {
            alert('User not logged in');
            return;
        }

        const requestData = {
            username,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
        };

        post(`/auth/${username}/change-password`, requestData)
            .then(() => {
                setShowConfirmPopup(false);
                setShowSuccessPopup(true);
                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            })
            .catch((error) => {
                console.error('Error changing password:', error);
                setShowConfirmPopup(false);
                setError('Failed to change password. Please try again.');
            });
    };

    return (
        <div className={cx('change-password-container')}>
            <h2>Change Password</h2>
            {error && <p className={cx('error-message')}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" className={cx('submit-button')}>
                    Update
                </Button>
            </form>

            {showConfirmPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-content')}>
                        <h3>Confirm Change</h3>
                        <p>Are you sure you want to change your password?</p>
                        <Button onClick={confirmChangePassword} className={cx('confirm-button')}>
                            Yes
                        </Button>
                        <Button onClick={() => setShowConfirmPopup(false)} className={cx('cancel-button')}>
                            No
                        </Button>
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-content')}>
                        <h3>Success!</h3>
                        <p>Your password has been changed successfully.</p>
                        <Button onClick={() => setShowSuccessPopup(false)} className={cx('success-button')}>
                            OK
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
