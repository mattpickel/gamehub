// Validates that key event in Wordle game is a valid key

const validKeys: string[] = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE', 'DELETE'
];

const validKeySet: Set<string> = new Set(validKeys);

const isValidKey = (key: string): boolean => {
    return validKeySet.has(key);
};

export default isValidKey;