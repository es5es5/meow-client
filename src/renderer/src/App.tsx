import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoomList from './views/room/RoomList'
import Home from './components/Home'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<RoomList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
