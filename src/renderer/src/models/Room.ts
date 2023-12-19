import { User } from './User'

export interface RoomItem {
  createdAt: string
  id: string
  name: string
  ownerId: string
  ownerName: string
  ownerProfile: string
}

export interface RoomDetail {
  room: RoomItem
  players?: Array<User>
}

export interface MessageItem {
  roomId: string
  message: string
  senderId: string
  senderName: string
  senderProfile: string
  isMe?: boolean
}
