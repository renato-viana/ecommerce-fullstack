export interface UserTokenPayload {
    user: User
    iat: number
}

export interface User {
    id: number
    name: string
    email: string
    password_digest: string
}
