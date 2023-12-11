import { useState } from 'react'
import './header.scss'

function PageHeader(props: { title: string; onBackClick: any }): JSX.Element {
  const [isSettingsIconMouseOver, setisSettingsIconMouseOver] = useState(false)
  const [isBackIconMouseOver, setisBackIconMouseOver] = useState(false)

  const renderSettingsIcon = (): JSX.Element => {
    return (
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          fill={isSettingsIconMouseOver ? '#eee' : '#6C7883'}
        />
      </svg>
    )
  }

  const renderBackIcon = (): JSX.Element => {
    return (
      <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.828 13.222l5.364 5.364L11.778 20 4 12.222l7.778-7.778 1.414 1.414-5.364 5.364H20v2H7.828z"
          fill={isBackIconMouseOver ? '#eee' : '#6C7883'}
        />
      </svg>
    )
  }

  return (
    <div id="header">
      <div
        className="iconWrap back"
        onClick={props.onBackClick}
        onMouseOver={() => setisBackIconMouseOver(true)}
        onMouseLeave={() => setisBackIconMouseOver(false)}
      >
        {renderBackIcon()}
      </div>
      <h2>{props.title}</h2>
      <div
        className="iconWrap settings"
        onMouseOver={() => setisSettingsIconMouseOver(true)}
        onMouseLeave={() => setisSettingsIconMouseOver(false)}
      >
        {renderSettingsIcon()}
      </div>
    </div>
  )
}

export default PageHeader
