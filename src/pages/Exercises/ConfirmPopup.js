import React from 'react';
import styles from './Exercises.module.scss'; // Style the modal

function ConfirmPopup({ message, onConfirm, onCancel }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h3>{message}</h3>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        OK
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopup;
