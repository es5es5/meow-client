import './sendChatMessage.scss'

function SendChatMessage(props: {
  inputText: string
  setInputText: any
  sendChatMessage: any
}): JSX.Element {
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      props.sendChatMessage()
    }
  }

  return (
    <div id="sendChatMessage">
      <textarea
        name=""
        id=""
        value={props.inputText}
        onChange={(e) => props.setInputText(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      ></textarea>
      <div className="sendMessageIconWrap" onClick={() => props.sendChatMessage()}>
        <svg width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#prefix__clip0_1569_3)">
            <path
              d="M30.072 16.322L9.985 10.555a.938.938 0 00-1.154 1.234l1.631 4.196 14.908 1.202c.287.022.287.444 0 .467l-14.781 1.195-2.262 2.184c-.663.64-.15 1.693.71 1.622l3.894-.313 1.914 4.917a.94.94 0 001.406.433l14.09-9.697c.66-.453.481-1.458-.27-1.673z"
              fill={props.inputText.length > 0 ? '#5288C1' : '#6C7883'}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default SendChatMessage
