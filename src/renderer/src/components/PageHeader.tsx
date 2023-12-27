import { useState } from 'react'
import './header.scss'
import { Player } from '@renderer/models/User'

function PageHeader(props: {
  title: string
  onBackClick: any
  players?: Array<Player>
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
          {player.isRoomOwner && <div className="badgeWrap">{renderBadgeIcon()}</div>}
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

  const renderBadgeIcon = (): JSX.Element => {
    return (
      <svg width="25" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#prefix__filter0_d_1574_3)">
          <path
            d="M1.405 2.494C1.405 1.669 2.074 1 2.899 1h8.253c.825 0 1.494.669 1.494 1.494v.127c0 .755-.612 1.366-1.367 1.366v-1.57H2.771v1.57a1.366 1.366 0 01-1.366-1.366v-.127z"
            fill="#FFEEB0"
          />
          <path
            d="M1.405 2.682c0-.825.669-1.494 1.494-1.494h8.253c.825 0 1.494.669 1.494 1.494v.127c0 .755-.612 1.366-1.367 1.366v-1.57H2.771v1.57A1.366 1.366 0 011.405 2.81v-.127z"
            fill="#F4CC3F"
          />
          <path d="M2.772 2.588h8.507v6.024l-4.254 2.985-4.253-2.985V2.588z" fill="#CE4444" />
          <mask id="prefix__a" maskUnits="userSpaceOnUse" x="2" y="2" width="10" height="10">
            <path d="M2.774 2.588h8.503v6.025l-4.252 2.984-4.25-2.984V2.588z" fill="#AF3B3B" />
          </mask>
          <g mask="url(#prefix__a)">
            <path fill="#983535" d="M5.397-.987h3.256v12.584H5.397z" />
          </g>
          <rect x="6.316" y="10.017" width="1.367" height="2.329" rx=".684" fill="#C09525" />
          <circle cx="7" cy="17.804" r="6" fill="url(#prefix__paint0_linear_1574_3)" />
          <circle cx="7" cy="17.803" fill="#705100" r="4.684" />
          <mask id="prefix__b" maskUnits="userSpaceOnUse" x="2" y="13" width="10" height="11">
            <circle cx="7.284" cy="18.338" r="4.694" fill="#C28B37" />
          </mask>
          <g mask="url(#prefix__b)">
            <circle cx="7" cy="17.804" r="4.694" fill="#F5B307" />
          </g>
          <circle cx="7.063" cy="17.837" r="3.857" fill="#C18222" />
          <path
            d="M7.063 14.733l.91 1.85 1.818.231-1.249 1.425.34 2.044-1.819-.925-1.818.925.342-2.044-1.251-1.425 1.818-.23.91-1.85z"
            fill="url(#prefix__paint1_linear_1574_3)"
          />
          <path
            d="M7.512 14.513l-.449-.913-.448.913-.79 1.608-1.553.197-.934.12.622.706 1.095 1.246-.303 1.81-.164.978.884-.45 1.591-.81 1.592.81.882.45-.162-.977-.3-1.81 1.092-1.247.62-.707-.933-.119-1.551-.197-.79-1.608z"
            stroke="#A36D1D"
            strokeOpacity=".2"
          />
          <path
            opacity=".5"
            d="M11.296 6.362h-8.56V2.599h8.56v3.763z"
            fill="url(#prefix__paint2_linear_1574_3)"
          />
        </g>
        <defs>
          <linearGradient
            id="prefix__paint0_linear_1574_3"
            x1="7"
            y1="11.804"
            x2="7"
            y2="23.804"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E7CD73" />
            <stop offset="1" stopColor="#EA8C00" />
          </linearGradient>
          <linearGradient
            id="prefix__paint1_linear_1574_3"
            x1="7.063"
            y1="14.733"
            x2="7.063"
            y2="20.283"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset="0" stopColor="#FFFFFD" />
            <stop offset="1" stopColor="#FFE86D" />
          </linearGradient>
          <linearGradient
            id="prefix__paint2_linear_1574_3"
            x1="7.016"
            y1="6.362"
            x2="7.016"
            y2="2.599"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A21D1D" stopOpacity="0" />
            <stop offset="1" stopColor="#5A1414" />
          </linearGradient>
          <filter
            id="prefix__filter0_d_1574_3"
            x=".217"
            y=".217"
            width="24.536"
            height="35.34"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="5.484" dy="5.484" />
            <feGaussianBlur stdDeviation="3.134" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1574_3" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1574_3" result="shape" />
          </filter>
        </defs>
      </svg>
    )
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
