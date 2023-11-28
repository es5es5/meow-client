import { WSMessageData } from '@renderer/models/WS'
import { useEffect, useState } from 'react'

interface RoomItem {
  id: string
  name: string
}

function RoomList(): JSX.Element {
  const ws = new WebSocket('wss://meow.rcan.net')
  const [wsConnected, setWsConnected] = useState(0)
  const [roomList, setRoomList] = useState([] as Array<RoomItem>)

  ws.onopen = (): void => {
    setWsConnected(ws.readyState)

    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'list'
        }
      })
    )
  }

  useEffect(() => {
    ws.onmessage = (message): void => {
      const WSMessageData = JSON.parse(message.data) as WSMessageData
      if (WSMessageData && WSMessageData.event === 'room') {
        switch (WSMessageData.data.action) {
          case 'list':
            console.log('list', WSMessageData.data.data)
            setRoomList(WSMessageData.data.data)
        }
      }
    }
  }, [])

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
