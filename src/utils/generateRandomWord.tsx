import { answers } from '../data/wordleWords';

const generateRandomWord: (() => string) = () => {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex].toUpperCase();
}

export default generateRandomWord;