import PageHeader from '@renderer/components/PageHeader'
import { MessageItem, RoomDetail } from '@renderer/models/Room'
import { WSMessageData } from '@renderer/models/WS'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MessageList from './components/MessageList'
import SendChatMessage from './components/SendChatMessage'
import './roomDetail.scss'

function RoomDetailPage(): JSX.Element {
  const ws = useRef(new WebSocket(import.meta.env.RENDERER_VITE_SOCKET_URL))
  const [roomDetail, setRoomDetail] = useState({} as RoomDetail)
  const [roomMessages, setRoomMessages] = useState([] as Array<MessageItem>)
  const [inputText, setInputText] = useState('' as any)
  const navigate = useNavigate()
  const params = useParams()

  const socketOnOpen = (): void => {
    ws.current.onopen = (): void => {
      ws.current.send(
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
    ws.current.onmessage = (message): void => {
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
        // switch (WSMessageData.data.action) {
        //   case 'detail':
        //     console.log('detail', WSMessageData.data.data)
        //     setRoomDetail(WSMessageData.data.data)
        // }
        switch (WSMessageData.data.action) {
          case 'message':
            setRoomMessages([
              roomMessages.map((message: MessageItem) => {
                return {
                  ...message,
                  isMe: message.senderId === import.meta.env.RENDERER_VITE_USER_ID,
                }
              }),
              ...WSMessageData.data.data.map((message: MessageItem) => {
                return {
                  ...message,
                  isMe: message.senderId === import.meta.env.RENDERER_VITE_USER_ID,
                }
              }),
            ])
        }
        return
      }
    }
  }

  const sendJoinRoomMessage = (roomId?: string): void => {
    if (!roomId || roomId === '') return
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
    socketOnOpen()
    // setRoomMessages([
    //   {
    //     roomId: 'string',
    //     message: 'stringtrue',
    //     senderId: 'trueg',
    //     senderName: 'trueng',
    //     senderProfile: 'trueing',
    //     isMe: true,
    //   },
    //   {
    //     roomId: 'string',
    //     message: 'stringtrue',
    //     senderId: 'trueg',
    //     senderName: 'trueng',
    //     senderProfile: 'trueing',
    //     isMe: false,
    //   },
    // ])
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
