import { User } from './User'

export type RoomItem = {
  createdAt: string
  id: string
  name: string
  ownerId: string
  ownerName: string
  ownerProfile: string
}

export type RoomDetail = {
  room: RoomItem
  players?: Array<User>
}

export type MessageItem = {
  roomId: string
  message: string
  senderId: string
  senderName: string
  senderProfile: string
  isMe?: boolean
}
