import { Player } from './User'

export type RoomDetail = {
  room: RoomItem
  players?: Array<Player>
}

export type RoomItem = {
  attendeeTotal: number
  canEnter: boolean
  createdAt: string
  id: string
  isSecret: boolean
  name: string
  ownerId: string
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
