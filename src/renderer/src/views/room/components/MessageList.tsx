import { MessageItem } from '@renderer/models/Room'
import './message.scss'

const renderMyChat = (message: MessageItem): JSX.Element => {
  return <span className="message">{message.message}</span>
}

const renderOtherChat = (message: MessageItem): JSX.Element => {
  return <span className="message">{message.message}</span>
}

function MessageList(props: { roomMessages: Array<MessageItem> }): JSX.Element {
  return (
    <ul className="messageWrap">
      {props.roomMessages.map((message: MessageItem, index) => {
        return (
          <li className={`${message.isMe ? 'right' : 'left'}`} key={`message_${index}`}>
            {message.isMe ? renderMyChat(message) : renderOtherChat(message)}
          </li>
        )
      })}
    </ul>
  )
}

export default MessageList
