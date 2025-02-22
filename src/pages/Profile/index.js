import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import Cookies from 'js-cookie';
import { get, post } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

const EditProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
    });

    const [loading, setLoading] = useState(true);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            // Sử dụng phương thức get từ api.js để gọi API
            get(`/user-information/${username}`)
                .then((data) => {
                    setFormData({
                        fullName: data.fullname || '',
                        email: username,
                        phone: data.phone || '',
                        dateOfBirth: data.birthday || '',
                        gender: data.gender || '',
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user information:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            alert('User not logged in');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email) {
            alert('Full Name and Email are required!');
            return;
        }
        setShowConfirmPopup(true);
    };

    const confirmUpdate = () => {
        const updatedData = {
            username: formData.email,
            fullname: formData.fullName,
            birthday: formData.dateOfBirth,
            gender: formData.gender,
            phone: formData.phone,
        };

        // Sử dụng phương thức post từ api.js để gọi API
        post('/user-information', updatedData)
            .then((data) => {
                console.log('Updated Profile:', data);
                setShowConfirmPopup(false);
                setShowSuccessPopup(true);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                setShowConfirmPopup(false);
                alert('Failed to update profile!');
            });
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('edit-profile-container')}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <Button type="submit" className={cx('submit-button')}>
                    Save
                </Button>
            </form>

            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-content')}>
                        <h3>Confirm Update</h3>
                        <p>Are you sure you want to update your profile?</p>
                        <Button onClick={confirmUpdate} className={cx('confirm-button')}>
                            Yes
                        </Button>
                        <Button onClick={() => setShowConfirmPopup(false)} className={cx('cancel-button')}>
                            No
                        </Button>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-content')}>
                        <h3>Success!</h3>
                        <p>Your profile has been updated successfully.</p>
                        <Button onClick={closeSuccessPopup} className={cx('success-button')}>
                            OK
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
