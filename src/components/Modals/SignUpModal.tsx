import React from 'react';
import Modal from './Modal';
import { SignUp } from '@clerk/clerk-react';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} hasCloseBtn={true}>
                <SignUp></SignUp>
            </Modal>
        </>
    )
}

export default SignUpModal;