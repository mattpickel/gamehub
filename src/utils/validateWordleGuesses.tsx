import { validGuessesSet } from "../data/wordleWords";
// Check if a word is a valid Wordle guess

const isValidWord = (guess: string): boolean => {
    return validGuessesSet.has(guess.toLowerCase());
};

export default isValidWord;