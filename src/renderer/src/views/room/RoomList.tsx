import { RoomItem } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { ReactNode, useEffect, useState } from 'react'
import './room.scss'

function RoomList(): JSX.Element {
  const [ws, setWs] = useState(new WebSocket('wss://meow.rcan.net'))
  const [wsConnected, setWsConnected] = useState(0)
  const [roomList, setRoomList] = useState([] as Array<RoomItem>)
  const [roomName, setRoomName] = useState('' as string)

  const socketOnOpen = (): void => {
    ws.onopen = (): void => {
      console.log('ononpen')
      setWsConnected(ws.readyState)

      ws.send(
        JSON.stringify({
          event: 'room',
          data: {
            action: 'list',
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
      }
    }
  }

  const createRoom = (): void => {
    if (!wsConnected) return
    if (roomName === '') return
    console.log('createRoom')
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

  const joinRoom = (roomId: string): void => {
    if (!wsConnected) return
    if (roomId === '') return
    console.log(`${roomId} joinRoom`)
    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'join',
          name: roomId,
        },
      }),
    )
  }

  const RenderRoomList = (roomList: Array<RoomItem>): ReactNode => {
    const render = roomList.map((room) => {
      return (
        <li
          key={room.id}
          onClick={(event) => {
            event.preventDefault()
            joinRoom(room.id)
          }}
        >
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
    setRoomList([
      {
        id: '1',
        name: 'Test 방',
      },
      {
        id: '2',
        name: 'Hello Meow!',
      },
      {
        id: '3',
        name: '여기까지 하드코딩임 방 클릭하면 입장',
      },
    ])
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
      <ul className="roomWrap">{RenderRoomList(roomList)}</ul>
      <div className="createWrap">
        <div
          className="gamepadIconWrap"
          onClick={(event) => {
            event.preventDefault()
            createRoom
          }}
        >
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
