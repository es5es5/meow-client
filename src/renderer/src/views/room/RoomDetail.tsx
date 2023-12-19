import PageHeader from '@renderer/components/PageHeader'
import { RoomItem } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './roomDetail.scss'
import { User } from '@renderer/models/User'
import SendChatMessage from './components/SendChatMessage'

interface RoomDetail {
  room: RoomItem
  players?: Array<User>
}

function RoomDetail(): JSX.Element {
  const [ws, setWs] = useState(new WebSocket(import.meta.env.RENDERER_VITE_SOCKET_URL))
  const [roomDetail, setRoomDetail] = useState({} as RoomDetail)
  const [roomMessages, setRoomMessages] = useState({} as any)
  const [inputText, setInputText] = useState('' as any)
  const navigate = useNavigate()
  const params = useParams()

  const socketOnOpen = (): void => {
    ws.onopen = (): void => {
      ws.send(
        JSON.stringify({
          event: 'connect',
          data: {
            id: import.meta.env.RENDERER_VITE_USER_ID,
            nickName: import.meta.env.RENDERER_VITE_USER_ID,
            eventListener: ['room.detail', 'room.message'],
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
      if (WSMessageData && WSMessageData.event === 'connection') {
        console.log('sendJoin', params.roomId)
        sendJoinRoomMessage(params.roomId)
        return
      }
      if (WSMessageData && WSMessageData.event === 'room') {
        switch (WSMessageData.data.action) {
          case 'list':
        }
        switch (WSMessageData.data.action) {
          case 'detail':
            console.log('detail', WSMessageData.data.data)
            setRoomDetail(WSMessageData.data.data)
        }
        switch (WSMessageData.data.action) {
          case 'message':
            console.log('message', WSMessageData.data.data)
        }
        return
      }
    }
  }

  const sendJoinRoomMessage = (roomId?: string): void => {
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

  const sendChatMessage = (): void => {
    if (inputText.length < 1) return
    ws.send(
      JSON.stringify({
        event: 'message',
        data: {
          roomId: roomDetail.room?.id,
          message: inputText,
        },
      }),
    )
    setInputText('')
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
      <PageHeader
        title={roomDetail.room?.name}
        onBackClick={leaveRoom}
        players={roomDetail.players}
      />
      <hr />
      <div>
        <ul>
          <li>ㅁㄴㅇㄹ</li>
        </ul>
      </div>
      <SendChatMessage
        inputText={inputText}
        setInputText={setInputText}
        sendChatMessage={sendChatMessage}
      />
    </div>
  )
}

export default RoomDetail
