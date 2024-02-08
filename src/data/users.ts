type Users = {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    totalGamesPlayed: number;
    totalGamesWon: number;
    longestStreak: number;
    currentStreak: number;
}

const users: Users[] = [
    {
        id: 'user_2bkj1Hwkpsm2Xzbcjs6A6ffTshh',
        username: 'testuser3',
        firstName: 'John',
        lastName: 'Doe',
        totalGamesPlayed: 10,
        totalGamesWon: 5,
        longestStreak: 3,
        currentStreak: 2
    },
    {
        id: '2',
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        totalGamesPlayed: 20,
        totalGamesWon: 10,
        longestStreak: 5,
        currentStreak: 4
    }
]

export default users;
