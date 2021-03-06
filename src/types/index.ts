import { FieldValue } from "@firebase/firestore";

export interface IProfile {
  address?: any
  company?: any
  email?: string
  id?: string
  name?: string
  username?: string
  phone?: string
  website?: string
  lastVisit?: Date | string
  image?: string

}

export interface IComment {
  likes: ILike[]
  userId: string
  userImg: string
  userName: string
  message: string
  timestamp: number
  postId: string
  id: string
}

export interface IRoute {
  path: string
  component: Element
}

export interface ILike {
  userId: string
  userImg: string
  userName: string
  timestamp: number
}

export interface IPost {
  img: string
  userImg: string
  id: string
  username: string
  description: string
  likes: ILike[]
  comments?: IComment[],
  uid: string,
  timestamp: number
}

export interface IUser {
  displayName: string
  email: string
  photoURL: string
  username?: string
  uid: string,
  webPage?: string,
  bio?: string,
  phoneNumber?: string
  male?: string 
  followers?: string[]
  following?: string[]
}

export interface IAction {
  type: string
  payload?: any
}

export type IDispatch = (action: IAction) => void

export interface userCreadentials {
  displayName: string,
  email: string
  password: string
  photoURL: string
}
export interface IAlert {
  type: string
  message: string
}

export interface IAlerts {
  [key: string]: IAlert
}

export interface IDropItem {
  icon: any
  title: string
  value: string
}


export interface IPostIMage {
  img: string
  id: number | string
}

export interface IMessage {
  content: string,
  timeStamp: FieldValue,
  userId: string,
  userImg: string,
  userName: string,
  type: string
}