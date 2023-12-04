import { RoomItem } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { ReactNode, useEffect, useState } from 'react'
import './room.scss'

const RenderRoomList = (roomList: Array<RoomItem>): ReactNode => {
  const render = roomList.map((room, index) => {
    return (
      <li key={room.id}>
        {index + 1} {room.name}
      </li>
    )
  })

  return render
}

function RoomList(): JSX.Element {
  const ws = new WebSocket('wss://meow.rcan.net')
  const [wsConnected, setWsConnected] = useState(0)
  const [roomList, setRoomList] = useState([] as Array<RoomItem>)
  const [roomName, setRoomName] = useState('' as string)

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

  const createRoom = (): void => {
    if (roomName === '') return
    console.log('createRoom')
    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'create',
          name: roomName
        }
      })
    )
  }

  return (
    <div id="roomList">
      <p>방 목록</p>
      <input
        type="text"
        placeholder="방이름"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button type="button" className="createRoom" onClick={createRoom}>
        방만들기
      </button>
      <hr />
      <ul>{RenderRoomList(roomList)}</ul>
    </div>
  )
}

export default RoomList
