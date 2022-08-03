import React, {useState, useEffect} from 'react';

const Modal = ({
    className = '',
    onClose = () => {},
    children
}) => {    

    return (
        <div className={`kp-modal ${className}`}>
            <div className="kp-modal-mask" onClick={onClose}>
            </div>

            <div className={`kp-modal-container`}>
                <div className={`kp-modal-content`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;