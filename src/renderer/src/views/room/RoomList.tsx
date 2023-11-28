import { useEffect, useState } from 'react'

function RoomList(): JSX.Element {
  const ws = new WebSocket('wss://meow.rcan.net')
  const [wsConnected, setWsConnected] = useState(0)

  ws.onopen = (): void => {
    setWsConnected(ws.readyState)
  }
  return (
    <div>
      RoomList
      <ul>
        <li>room: </li>
      </ul>
    </div>
  )
}

export default RoomList
