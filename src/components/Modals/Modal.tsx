import React, { useEffect, useRef, useState } from 'react';

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
            <dialog ref={modalRef} onKeyDown={handleKeyDown} className='relative'>
                {hasCloseBtn && (
                    <button className='modal-close-btn absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center' onClick={handleCloseModal}>
                        X
                    </button>
                )}
                {children}
            </dialog>
        </>
    )
}

export default Modal;