import React, { useEffect, useRef, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, hasCloseBtn, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    }

    const [isHovered, setIsHovered] = useState(false);

    // Update state when escape key is pressed
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    // Sync ModalOpen state with isOpen prop
    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    // Use HTMLDialogElement API to manage visiblity of modal dialog depending on the state
    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
        <>
            <dialog ref={modalRef} onKeyDown={handleKeyDown} className='bg-gray-800 rounded-lg'>
                {hasCloseBtn && (
                    <button 
                    className='modal-close-btn absolute top-2 right-2 h-4 w-4 flex items-center justify-center align-middle text-white outline-none' 
                    onClick={handleCloseModal}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? <CancelIcon /> : <HighlightOffIcon />}
                </button>
                )}
                {children}
            </dialog>
        </>
    )
}

export default Modal;