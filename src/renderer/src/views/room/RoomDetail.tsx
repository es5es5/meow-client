import PageHeader from '@renderer/components/PageHeader'
import { MessageItem, RoomDetail } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MessageList from './components/MessageList'
import SendChatMessage from './components/SendChatMessage'
import './roomDetail.scss'

function RoomDetailPage(): JSX.Element {
  const ws = useRef<WebSocket>()
  const [roomDetail, setRoomDetail] = useState({} as RoomDetail)
  const [roomMessages, setRoomMessages] = useState([] as Array<MessageItem>)
  const [inputText, setInputText] = useState('' as any)
  const navigate = useNavigate()
  const params = useParams()

  const sendJoinRoomMessage = (roomId?: string): void => {
    if (!roomId || roomId === '') return
    if (!ws.current?.readyState) return
    ws.current.send(
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
    if (!ws.current?.readyState) return
    ws.current.send(
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
    if (!ws.current?.readyState) return
    ws.current.send(
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
    ws.current = new WebSocket(import.meta.env.RENDERER_VITE_SOCKET_URL)
    ws.current.onopen = (): void => {
      if (!ws.current?.readyState) return
      ws.current.send(
        JSON.stringify({
          event: 'connect',
          data: {
            id: import.meta.env.RENDERER_VITE_USER_ID,
            nickName: import.meta.env.RENDERER_VITE_USER_ID,
            eventListener: ['room.join', 'room.detail', 'room.message'],
          },
        }),
      )
    }
    ws.current.onmessage = (message): void => {
      const WSMessageData = JSON.parse(message.data) as WSMessageData
      if (WSMessageData && WSMessageData.event === 'connection') {
        console.log('sendJoin', params.roomId)
        sendJoinRoomMessage(params.roomId)
      }
      if (WSMessageData && WSMessageData.event === 'room') {
        let newMessage = {} as MessageItem
        switch (WSMessageData.data.action) {
          case 'list':
            break
          case 'join':
          case 'detail':
            setRoomDetail(WSMessageData.data.data)
            break
          case 'message':
            console.log('before', roomMessages)
            newMessage = {
              ...WSMessageData.data.data,
              isMe: WSMessageData.data.data.senderId === import.meta.env.RENDERER_VITE_USER_ID,
            }
            setRoomMessages([...roomMessages, newMessage])
            break
        }
      }
    }
  }, [roomMessages])

  return (
    <div id="roomDetail">
      <PageHeader
        title={roomDetail.room?.name}
        onBackClick={leaveRoom}
        players={roomDetail.players}
      />
      <hr />
      <div>
        <MessageList roomMessages={roomMessages} />
      </div>
      <SendChatMessage
        inputText={inputText}
        setInputText={setInputText}
        sendChatMessage={sendChatMessage}
      />
    </div>
  )
}

export default RoomDetailPage
