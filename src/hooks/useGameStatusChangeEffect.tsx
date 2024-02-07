import { useEffect } from 'react';
import { useWordleGameStore } from '../stores/useWordleGameStore';
import { useWordleUIStore } from '../stores/useWordleUIStore';
// Change and display game result modal based on game status

const useGameStatusChangeEffect = () => {
    const gameStatus = useWordleGameStore((state) => state.gameStatus);
    const setIsModalOpen = useWordleUIStore((state) => state.setIsModalOpen);
    const setModalMessage = useWordleUIStore((state) => state.setModalMessage);
    const setModalType = useWordleUIStore((state) => state.setModalType);
    useEffect(() => {
        switch (gameStatus) {
            case 'playing':
              setIsModalOpen(false);
              break;
            case 'won':
              setModalType('gameOver');
              setModalMessage('Nice Job!');
              setIsModalOpen(true);
              break;
            case 'lost':
              setModalType('gameOver');
              setModalMessage('Maybe next time!');
              setIsModalOpen(true);
              break;
            default:
              break;
          }
    }, [gameStatus, setIsModalOpen, setModalMessage]);
}

export default useGameStatusChangeEffect;