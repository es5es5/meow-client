import { Player } from './User'

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
  players?: Array<Player>
}

export type MessageItem = {
  roomId: string
  message: string
  senderId: string
  senderName: string
  senderProfile: string
  isRoomOwner?: boolean
  isMe?: boolean
}
