const validWords: string[] = [
    'TESTY', 'TESTS', 'APPLE', 'TEEST', 'PAPPY', 
];

const validWordSet: Set<string> = new Set(validWords);

const isValidWord = (key: string): boolean => {
    return validWordSet.has(key);
};

export default isValidWord;