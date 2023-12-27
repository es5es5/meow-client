import { MessageItem } from '@renderer/models/Room'
import './message.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')

const renderMyChat = (message: MessageItem): JSX.Element => {
  return (
    <div className="messageWrap me">
      <span className="sendDatetime me">{dayjs(message.sendDatetime).format('A hh:mm')}</span>
      <span className="messageText me">{message.message}</span>
    </div>
  )
}

const renderOtherChat = (message: MessageItem): JSX.Element => {
  return (
    <div className="messageWrap other">
      <img src={`data:image/png;${message.senderProfile}`} alt="" className="senderProfile other" />
      <span className="messageText other">
        <span className="senderName other">{message.senderName}: </span>
        {message.message}
      </span>
      <span className="sendDatetime other">{dayjs(message.sendDatetime).format('A hh:mm')}</span>
    </div>
  )
}

function MessageList(props: { roomMessages: Array<MessageItem> }): JSX.Element {
  return (
    <ul className="messageContainer">
      {props.roomMessages.map((message: MessageItem, index) => {
        return (
          <li className={`${message.isMe ? 'me' : ''}`} key={`message_${index}`}>
            {message.isMe ? renderMyChat(message) : renderOtherChat(message)}
          </li>
        )
      })}
    </ul>
  )
}

export default MessageList
