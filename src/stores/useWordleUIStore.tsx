import { create } from 'zustand';

type State = {
  isModalOpen: boolean;
  modalMessage: string;
  modalType: string;
  isScoreDisplayed: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalMessage: (message: string) => void;
  setModalType: (type: string) => void;
  setIsScoreDisplayed: (isDisplayed: boolean) => void;
};

export const useWordleUIStore = create<State>()((set) => ({
  isModalOpen: false,
  modalMessage: '',
  modalType: '',
  isScoreDisplayed: true,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setModalMessage: (message: string) => set({ modalMessage: message }),
  setModalType: (type: string) => set({ modalType: type }),
  setIsScoreDisplayed: (isDisplayed: boolean) => set({ isScoreDisplayed: isDisplayed }),
}));