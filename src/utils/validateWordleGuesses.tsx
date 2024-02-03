import { validGuessesSet } from "../data/wordleWords";

const isValidWord = (guess: string): boolean => {
    return validGuessesSet.has(guess.toLowerCase());
};

export default isValidWord;