import { RoomItem } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './roomList.scss'

function RoomList(): JSX.Element {
  const [ws, setWs] = useState(new WebSocket(import.meta.env.RENDERER_VITE_SOCKET_URL))
  const [roomList, setRoomList] = useState([] as Array<RoomItem>)
  const [roomName, setRoomName] = useState('' as string)
  const navigate = useNavigate()

  const socketOnOpen = (): void => {
    ws.onopen = (): void => {
      console.log('ononpen')

      ws.send(
        JSON.stringify({
          event: 'connect',
          data: {
            id: import.meta.env.RENDERER_VITE_USER_ID,
            nickName: import.meta.env.RENDERER_VITE_USER_ID,
            eventListener: ['room.list'],
          },
        }),
      )

      socketOnMessage()
    }
  }

  const socketOnMessage = (): void => {
    ws.onmessage = (message): void => {
      const WSMessageData = JSON.parse(message.data) as WSMessageData
      if (WSMessageData && WSMessageData.event === 'room') {
        switch (WSMessageData.data.action) {
          case 'list':
            console.log('list', WSMessageData.data.data)
            setRoomList(WSMessageData.data.data)
        }
        switch (WSMessageData.data.action) {
          case 'join':
            console.log('join', WSMessageData.data.data)
            console.log('WSMessageData.data?.data?.room.id', WSMessageData.data?.data?.room.id)
            navigate(`/room/${WSMessageData.data?.data?.room.id}`)
        }
      }
    }
  }

  const createRoom = (): void => {
    if (roomName === '') return
    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'create',
          name: roomName,
        },
      }),
    )
  }

  const sendJoinRoomMessage = (roomId: string): void => {
    if (roomId === '') return
    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'join',
          id: roomId,
        },
      }),
    )
  }

  const RenderRoomItemList = (roomList: Array<RoomItem>): ReactNode => {
    const render = roomList.map((room) => {
      return (
        <li key={room.id} onClick={() => sendJoinRoomMessage(room.id)}>
          <div className="profileWrap">
            <img
              className="profileImage"
              src="https://cdn-icons-png.flaticon.com/128/1581/1581279.png"
              alt="profile"
            />
          </div>
          <div className="titleWrap">
            <p className="roomName">{room.name}</p>
          </div>
        </li>
      )
    })

    return render
  }

  useEffect(() => {
    socketOnOpen()
  }, [])

  return (
    <div id="roomList">
      <input
        type="text"
        name="roomName"
        className="roomName"
        placeholder="여기에 방이름 입력하고 아래 게임버튼 누르면 방 생성"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <hr />
      <ul className="roomWrap">{RenderRoomItemList(roomList)}</ul>
      <div className="createWrap">
        <div className="gamepadIconWrap" onClick={createRoom}>
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.002 7H7a5 5 0 103.57 8.5h2.86A5 5 0 1017.002 7zM9.75 12.375a.375.375 0 01-.375.375H7.75v1.625a.375.375 0 01-.375.375h-.75a.375.375 0 01-.375-.375V12.75H4.626a.375.375 0 01-.375-.375v-.75a.375.375 0 01.375-.375H6.25V9.625a.375.375 0 01.375-.375h.75a.375.375 0 01.375.375v1.625h1.625a.375.375 0 01.375.375v.75zm6.75 2.375a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm2-3a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
              fill="#DCDCDC"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default RoomList
