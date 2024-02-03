import { create } from 'zustand';

type State = {
  isModalOpen: boolean;
  modalMessage: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalMessage: (message: string) => void;
};

export const useWordleUIStore = create<State>()((set) => ({
  isModalOpen: false,
  modalMessage: '',
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setModalMessage: (message: string) => set({ modalMessage: message }),
}));