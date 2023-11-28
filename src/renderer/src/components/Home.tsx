import Logo from '../assets/images/logo.png'
import './home.scss'
import { Link } from 'react-router-dom'

function Home(): JSX.Element {
  return (
    <div id="home">
      <div className="layout">
        <div className="title_wrap">
          <img src={Logo} alt="logo" className="logo" />
          <p className="title">Welcome to Meow !</p>
        </div>
        <div className="button_wrap">
          <button type="button" className="enter">
            <Link to={'/room'}>Enter</Link>
          </button>
        </div>
        {/* <div className="password_wrap">
        <input type="password" name="password" id="password" />
      </div> */}
      </div>
    </div>
  )
}

export default Home
