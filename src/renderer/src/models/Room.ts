import { User } from './User'

export interface RoomItem {
  id: string
  name: string
  ownerId?: string
  owner?: User
  user?: string[]
  // user?: Array<User>
}
