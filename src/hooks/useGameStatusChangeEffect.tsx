import { useEffect } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import { useWordleUIStore } from '../stores/useWordleUIStore';

const useGameStatusChangeEffect = () => {
    const gameStatus = useWordleGameStore((state) => state.gameStatus);
    const setIsModalOpen = useWordleUIStore((state) => state.setIsModalOpen);
    const setModalMessage = useWordleUIStore((state) => state.setModalMessage);
    useEffect(() => {
        switch (gameStatus) {
            case 'playing':
              setIsModalOpen(false);
              break;
            case 'won':
              setModalMessage('Nice Job!');
              setIsModalOpen(true);
              break;
            case 'lost':
              setModalMessage('Maybe next time!');
              setIsModalOpen(true);
              break;
            default:
              break;
          }
    }, [gameStatus, setIsModalOpen, setModalMessage]);
}

export default useGameStatusChangeEffect;