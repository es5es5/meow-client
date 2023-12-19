import { useState } from 'react'
import './header.scss'
import { User } from '@renderer/models/User'

function PageHeader(props: {
  title: string
  onBackClick: any
  players?: Array<User>
}): JSX.Element {
  const [isSettingsIconMouseOver, setisSettingsIconMouseOver] = useState(false)
  const [isBackIconMouseOver, setisBackIconMouseOver] = useState(false)
  const [isUserIconMouseOver, setIsUserIconMouseOver] = useState(false)
  const [isShowPlayerList, setIsShowPlayerList] = useState(false)

  const renderSettingsIcon = (): JSX.Element => {
    return (
      <div
        className="iconWrap right"
        onMouseOver={() => setisSettingsIconMouseOver(true)}
        onMouseLeave={() => setisSettingsIconMouseOver(false)}
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            fill={isSettingsIconMouseOver ? '#eee' : '#6C7883'}
          />
        </svg>
      </div>
    )
  }

  const renderUserIcon = (): JSX.Element => {
    return (
      <div
        className="iconWrap right"
        onClick={() => setIsShowPlayerList(!isShowPlayerList)}
        onMouseOver={() => setIsUserIconMouseOver(true)}
        onMouseLeave={() => setIsUserIconMouseOver(false)}
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 12a5 5 0 100-10 5 5 0 000 10zm3.5 1.25h-.652a6.808 6.808 0 01-5.696 0H8.5a5.251 5.251 0 00-5.25 5.25v1.625C3.25 21.16 4.09 22 5.125 22h13.75c1.035 0 1.875-.84 1.875-1.875V18.5a5.251 5.251 0 00-5.25-5.25z"
            fill={isUserIconMouseOver ? '#eee' : '#6C7883'}
          />
        </svg>
        <span className="countCircle">{props.players?.length}</span>
      </div>
    )
  }

  const renderBackIcon = (): JSX.Element => {
    return (
      <div
        className="iconWrap left"
        onClick={props.onBackClick}
        onMouseOver={() => setisBackIconMouseOver(true)}
        onMouseLeave={() => setisBackIconMouseOver(false)}
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.828 13.222l5.364 5.364L11.778 20 4 12.222l7.778-7.778 1.414 1.414-5.364 5.364H20v2H7.828z"
            fill={isBackIconMouseOver ? '#eee' : '#6C7883'}
          />
        </svg>
      </div>
    )
  }

  const renderPlayerList = (): JSX.Element | JSX.Element[] => {
    if (!props.players) {
      return <></>
    }

    const render = props.players?.map((player) => {
      return (
        <li key={player.id}>
          <img
            src={`data:image/png;${player.profileImageBase64}`}
            alt="profile"
            className="userProfile"
          />
          <span>{player.nickName}</span>
        </li>
      )
    })

    return render
  }

  return (
    <div id="header">
      {renderBackIcon()}
      <h2>{props.title}</h2>
      {renderUserIcon()}
      {isShowPlayerList ? (
        <div className="playerListWrap">
          <ul>{renderPlayerList()}</ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default PageHeader
