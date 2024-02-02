import { useCallback, useEffect } from 'react';

// Key listener for use with Wordle Game

const useKeyListener = (handleKeyPress: (key: string) => void) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key) {
            handleKeyPress(event.key.toUpperCase());
        }
    }, [handleKeyPress]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};

export default useKeyListener;