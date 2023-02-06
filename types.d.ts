import { ObjectId } from 'mongoose'

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
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    _id: string
  }
}

export interface ITask {
  name: string
  description: string
  list: ObjectId
  date: Date
  tags: ObjectId[]
  creator: ObjectId
}

export interface ITag {
  name: string
  creator: ObjectId
  color: string
}

export interface IList {
  name: string
  color: string
  creator: ObjectId
}

export interface ISticker {
  name: string
  description: string
  creator: ObjectId
  color: string
}
