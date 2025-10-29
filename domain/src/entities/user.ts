export const userRol = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT"
} as const

export type userRol = (typeof userRol)[keyof typeof userRol]

export interface User {
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    rol: userRol,
    active: boolean
}