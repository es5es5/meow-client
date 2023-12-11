import PageHeader from '@renderer/components/PageHeader'
import { RoomItem } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './roomDetail.scss'

interface RoomDetail {
  room: RoomItem
  user?: string[]
}

function RoomDetail(): JSX.Element {
  const location = useLocation()
  const [ws, setWs] = useState(new WebSocket(import.meta.env.RENDERER_VITE_SOCKET_URL))
  const [roomDetail, setRoomDetail] = useState({} as RoomDetail)
  const navigate = useNavigate()

  const socketOnOpen = (): void => {
    ws.onopen = (): void => {
      ws.send(
        JSON.stringify({
          event: 'connect',
          data: {
            id: import.meta.env.RENDERER_VITE_USER_ID,
          },
        }),
      )
      socketOnMessage()
    }
  }

  const socketOnMessage = (): void => {
    ws.onmessage = (message): void => {
      const WSMessageData = JSON.parse(message.data) as WSMessageData
      console.log('event', WSMessageData.event)
      if (WSMessageData && WSMessageData.event === 'connect') {
        console.log('sendJoin', location.state.roomId)
        sendJoinRoomMessage(location.state.roomId)
        return
      }
      if (WSMessageData && WSMessageData.event === 'room') {
        switch (WSMessageData.data.action) {
          case 'list':
        }
        switch (WSMessageData.data.action) {
          case 'join':
            console.log('join', WSMessageData.data.data.room)
            setRoomDetail(WSMessageData.data.data)
        }
        return
      }
    }
  }

  const sendJoinRoomMessage = (roomId: string): void => {
    if (!roomId || roomId === '') return
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

  const leaveRoom = (): void => {
    ws.send(
      JSON.stringify({
        event: 'room',
        data: {
          action: 'exit',
          id: roomDetail.room?.id,
        },
      }),
    )
    navigate('/room', {})
  }

  useEffect(() => {
    socketOnOpen()
  }, [])

  return (
    <div id="roomDetail">
      <PageHeader title={roomDetail.room?.name} onBackClick={leaveRoom} />
      <hr />
      <div>
        <p>방 접속한 사람</p>
        <ul>
          {roomDetail.user?.map((user, index) => {
            return <li key={index}>- {user}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default RoomDetail
