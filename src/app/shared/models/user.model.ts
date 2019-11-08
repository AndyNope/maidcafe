/**
 * User
 */
export interface User{
    id? : string,
    username: string,
    password: string,
    email: string,
    role: number,
    active: number,
    deleted: number,
    created: string
}