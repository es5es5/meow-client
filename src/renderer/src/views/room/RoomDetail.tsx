import { useLocation } from 'react-router-dom'

function RoomDetail(): JSX.Element {
  const location = useLocation()
  return <div>{location.state.roomId}</div>
}

export default RoomDetail
