import './login.scss'
import Logo from '../assets/images/logo.png'

function Login(): JSX.Element {
  return (
    <div id="login">
      <div className="layout">
        <div className="title_wrap">
          <img src={Logo} alt="logo" className="logo" />
          <p className="title">Welcome to Meow !</p>
        </div>
        <div className="button_wrap">
          <button type="button" className="enter">
            Enter
          </button>
        </div>
        {/* <div className="password_wrap">
        <input type="password" name="password" id="password" />
      </div> */}
      </div>
    </div>
  )
}

export default Login
