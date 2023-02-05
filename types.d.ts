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
