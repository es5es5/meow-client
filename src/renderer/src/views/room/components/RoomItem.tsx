import { RoomItem } from '@renderer/models/Room'
import '../room.scss'

function RoomItem(room: RoomItem, joinRoom): JSX.Element {
  return (
    <li key={room.id}>
      <span className="roomInfo">{room.name}</span>
      <button
        type="button"
        className="joinRoom"
        onClick={(event) => {
          event.preventDefault()
          joinRoom(room.id)
        }}
      >
        참가
      </button>
    </li>
  )
}

export default RoomItem
