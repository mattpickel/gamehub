import { create } from 'zustand';

type State = {
  isModalOpen: boolean;
  modalMessage: string;
  modalType: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalMessage: (message: string) => void;
  setModalType: (type: string) => void;
};

export const useWordleUIStore = create<State>()((set) => ({
  isModalOpen: false,
  modalMessage: '',
  modalType: '',
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setModalMessage: (message: string) => set({ modalMessage: message }),
  setModalType: (type: string) => set({ modalType: type }),
}));