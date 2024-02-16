import { answers } from '../data/wordleWords';
// Generate a random word from the list of possible answers; for use on Wordle game start

const generateRandomWord: (() => string) = () => {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex].toUpperCase();
}

export default generateRandomWord;