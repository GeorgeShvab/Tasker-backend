export interface IUser {
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  role: Role
  avatar: string
  mode: Mode
}

export interface IRefreshToken {
  token: string
  user: string
}

type Mode = 'light' | 'dark'

export type Role = 'admin' | 'user'

declare global {
  namespace Express {
    export interface Request {
      user: string
      tokenExpired?: boolean
    }
  }

  namespace jsonwebtoken {
    export interface JwtPayload {
      _id: string
    }
  }
}
