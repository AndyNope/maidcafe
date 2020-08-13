export interface User {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: number;
    active: number;
    deleted: number;
    created: string;
}

export interface UserEdit {
    id?: string;
    username: string;
    password: string;
    email: string;
    role: number;
}
