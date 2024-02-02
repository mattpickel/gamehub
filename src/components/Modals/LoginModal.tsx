import React from 'react';
import Modal from './Modal';
import { SignIn } from '@clerk/clerk-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} hasCloseBtn={true}>
                <SignIn></SignIn>
            </Modal>
        </>
    )
}

export default LoginModal;