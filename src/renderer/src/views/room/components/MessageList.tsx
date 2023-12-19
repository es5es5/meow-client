import { MessageItem } from '@renderer/models/Room'

function MessageList(props: { roomMessages: Array<MessageItem> }): JSX.Element {
  return (
    <>
      <ul className="messageWrap">
        {props.roomMessages.map((message: MessageItem, index) => {
          return (
            <li className={`${message.isMe ? 'right' : 'left'}`} key={`message_${index}`}>
              {message.message}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MessageList
