export interface User {
    _id?: string;
    userName: string;
    password: string;
    email: string;
    role: 'admin' | 'player' | 'moderator';
}
